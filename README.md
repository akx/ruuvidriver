ruuvidriver
===========

Serves your [Ruuvitag](https://tag.ruuvi.com/) Weather Station data over HTTP.

Tested on Raspberry Pi 3 with Raspbian and Node 9 from Nodesource.

Usage
-----

* `yarn`
* `yarn start`
* Visit `http://127.0.0.1:52020`. Any Ruuvitags in your device's vicinity should start showing up.

Configuration
-------------

Configured via environment variables or a `.env` file via dotenv.

* `RUUVI_PORT`: Port to serve on. Defaults to 52020.

Usage with Home-Assistant
-------------------------

Ruuvidriver is trivial to integrate with [home-assistant](https://home-assistant.io).

A [RESTful sensor](https://home-assistant.io/components/sensor.rest/) configuration for
humidity, pressure, temperature and Ruuvitag voltage looks like this.

(Replace `beefbeefbeef` with your tag's ID, and the IP address/port with something else
if your home-assistant is not on the same device as Ruuvidriver, or if you configured
the port above.)

```yaml
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Temperature
  value_template: '{{ value_json.temperature }}'
  unit_of_measurement: 'C'
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Humidity
  value_template: '{{ value_json.humidity }}'
  unit_of_measurement: '%RH'
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Ruuvi Voltage
  value_template: '{{ value_json.battery }}'
  unit_of_measurement: 'mV'
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Pressure
  value_template: '{{ value_json.pressure }}'
  unit_of_measurement: 'kPa'
  force_update: true
```