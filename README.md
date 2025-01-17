# selenium-chrome-proxy-plugin

Chrome plugin generator for setting private proxies to use with Selenium


This module is based on https://github.com/RobinDev/Selenium-Chrome-HTTP-Private-Proxy



If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/selenium-chrome-proxy-plugin/issues).


## Installation

```sh
npm install git+https://github.com/hieuhayho/selenium-chrome-proxy-plugin.git
```

## Usage

For usage please refer to `examples/index.js`.
Do not forget to put `chromedriver` into same directory.  

To run with debug output:

```sh
$ DEBUG=selenium-chrome-proxy-plugin node index
```

Module uses `os.tmpdir()` for temporary files (it depends on OS;`/tmp` for Linux). 
Temp directory may be changed by providing `tempDir` property in config:
Please, do not forget to call `plugin.cleanpu()` to remove temporary files.

```js
  const proxyConfig = {
    host: '<proxy_host>',
    port: '<proxy_port>', 
    username: '<proxy_username>', 
    password: '<proxy_password>',
    proxyType: '<proxy_type>',
    //proxyType: 'ex: http, https, socks5',
    tempDir:  './temp' 
  };
  return new ProxyPlugin({
    proxyConfig: proxyConfig
    //chromeOptions: chromeOptions,
  })
    .then((plugin) => {
      console.log('PLUGIN READY');
      return new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(plugin.chromeOptions)
        .build()
        .then((driver) => plugin.cleanup()
           .then(() => driver.get('http://whatismyip.host/'))
           .then(() => console.log('DONE'))
        )
        ;
    })
    .catch((err) => console.log('ERROR:', err))
    ;
```

Disable Proxy

```js
  const proxyConfig = {
    host: '0',
    port: '0', 
    username: '0', 
    password: '0',
    proxyType: '<proxy_type>',
    //proxyType: 'ex: http, https, socks5',
    tempDir:  './temp' 
  };
  return new ProxyPlugin({
    proxyConfig: proxyConfig
    //chromeOptions: chromeOptions,
  })
    .then((plugin) => {
      console.log('PLUGIN READY');
      return new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(plugin.chromeOptions)
        .build()
        .then((driver) => plugin.cleanup()
           .then(() => driver.get('http://whatismyip.host/'))
           .then(() => console.log('DONE'))
        )
        ;
    })
    .catch((err) => console.log('ERROR:', err))
    ;
```

It is also possible to provide `chromeOptions`:

```js 
return new ProxyPlugin({ proxyConfig: config, options: chromeOptions })
  .then((plugin) => {
  ...
```

May be used with callbacks:

```js
 return new ProxyPlugin({
    proxyConfig: proxyConfig,
    //chromeOptions: chromeOptions,
  }, (err, plugin) => {
  
    ...
    
  });
```

More info along with working examples may be found in `examples` subdirectory.


## Credits
[Alexander](https://github.com/alykoshin/)
[hieuhayho](https://github.com/hieuhayho/)
