# ruuvidriver

Serves your [Ruuvitag](https://tag.ruuvi.com/) Weather Station data over HTTP.

Tested on Raspberry Pi 3 with Raspbian and Node 9 from Nodesource.

## Usage

- `yarn`
- `yarn start`
- Visit `http://127.0.0.1:52020/tags`. Any Ruuvitags in your device's vicinity should start showing up.

:information_source: You'll get higher resolution data if your Ruuvitag is in Raw mode. You can toggle this by pressing the B button on your tag. See the "RAW mode" section in the [Ruuvitag Firmware docs](https://lab.ruuvi.com/ruuvitag-fw/).

### Not seeing tags?

If you're running Ruuvidriver as a regular user on Linux, the Node.js binary needs a capability to be allowed to do BLE things.

An easy way to set the `CAP_NET_RAW` capability required is

```
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

but be certain you understand what this means for other programs using the same Node.js binary.

## Endpoints

### All tags (`/tags`)

All tags, as a mapping:

```json
{
  "beefbeefbeef": {
    "dataFormat": 3,
    "rssi": -73,
    "humidity": 21,
    "temperature": 21.72,
    "pressure": 100664,
    "accelerationX": -64,
    "accelerationY": -44,
    "accelerationZ": 1020,
    "battery": 2935,
    "ts": 1521542394667
  }
}
```

### Single tag (`/tag/:id` (i.e. `/tag/beefbeefbeef`))

As above, but the given tag's data only.

```json
{
  "dataFormat": 3,
  "rssi": -73,
  "humidity": 21,
  "temperature": 21.72,
  "pressure": 100664,
  "accelerationX": -64,
  "accelerationY": -44,
  "accelerationZ": 1020,
  "battery": 2935,
  "ts": 1521542394667
}
```

## Configuration

Configured via environment variables or a `.env` file via dotenv.

- `RUUVI_PORT`: Port to serve on. Defaults to 52020.

## Usage with Home-Assistant

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
  value_template: "{{ value_json.temperature }}"
  unit_of_measurement: "C"
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Humidity
  value_template: "{{ value_json.humidity }}"
  unit_of_measurement: "%RH"
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Ruuvi Voltage
  value_template: "{{ value_json.battery }}"
  unit_of_measurement: "mV"
  force_update: true
- platform: rest
  resource: http://127.0.0.1:52020/tag/beefbeefbeef/
  name: Magic Mystery Room Pressure
  value_template: "{{ value_json.pressure }}"
  unit_of_measurement: "kPa"
  force_update: true
```
