const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

async function capture(url, outputPath, width = 390, height = 844) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--window-size=' + width + ',' + height,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + require('os').tmpdir() + '\\chrome-temp-' + Date.now(),
  ]);

  // Wait for remote debugging to be ready
  let versionData = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      versionData = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json/version', (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
      });
      if (versionData && versionData.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!versionData) {
    chrome.kill();
    throw new Error('Chrome remote debugging did not respond');
  }

  // Create new target/tab via PUT request
  const target = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 9222,
      path: `/json/new?${encodeURIComponent(url)}`,
      method: 'PUT'
    }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  });

  const wsUrl = target.webSocketDebuggerUrl;
  const WebSocket = require('ws');
  const ws = new WebSocket(wsUrl);

  await new Promise((resolve) => ws.on('open', resolve));

  let msgId = 1;
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = msgId++;
      const handler = (data) => {
        const msg = JSON.parse(data);
        if (msg.id === id) {
          ws.removeListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await new Promise((r) => setTimeout(r, 1200));

  if (process.env.EVAL_CODE) {
    const res = await send('Runtime.evaluate', {
      expression: `(async () => { ${process.env.EVAL_CODE} })()`,
      awaitPromise: true,
    });
    console.log('Eval code result:', res);
    await new Promise((r) => setTimeout(r, 600));
  } else if (process.env.CLICK_SELECTOR) {
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector("${process.env.CLICK_SELECTOR}");
        if (!el) return 'NOT_FOUND';
        el.click();
        return 'CLICKED: ' + el.tagName;
      })()`
    });
    console.log('Eval result:', res);
    await new Promise((r) => setTimeout(r, 800));
  }

  if (process.env.SCROLL_Y) {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${process.env.SCROLL_Y});`
    });
    await new Promise((r) => setTimeout(r, 600));
  }

  const captureParams = { format: 'png' };
  if (process.env.FULL_PAGE === '1') {
    captureParams.captureBeyondViewport = true;
  }

  const screenshot = await send('Page.captureScreenshot', captureParams);

  fs.writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));

  ws.close();
  chrome.kill();
  console.log('Saved screenshot to:', outputPath);
}

const outputPath = process.argv[2] || 'C:\\Users\\anuj\\.gemini\\antigravity-ide\\brain\\d778490c-0ddc-4b9a-84f8-410ace1931f0\\mobile_screenshot.png';
const width = parseInt(process.env.VIEWPORT_WIDTH || process.argv[3] || '390', 10);
const height = parseInt(process.env.VIEWPORT_HEIGHT || process.argv[4] || '844', 10);
capture('http://localhost:3000', outputPath, width, height)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
