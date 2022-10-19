
// var config = {
//   mode: "fixed_servers",
//   rules: {
//     singleProxy: {
//       scheme: "%proxy_type",
//       host: "%proxy_host",
//       port: parseInt(%proxy_port)
//     },
//     bypassList: ["foobar.com"]
//   }
// };

const config = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
      "  if (host == 'foobar.com')\n" +
      "    return 'PROXY blackhole:80';\n" +
      "  return 'DIRECT';\n" +
      "}"
  }
}

chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});

function callbackFn(details) {
  return {
    authCredentials: {
      username: "%username",
      password: "%password"
    }
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  {urls: ["<all_urls>"]},
  ['blocking']
);
