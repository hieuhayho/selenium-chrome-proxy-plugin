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

