# Gladys-Raspberry-Info

A module that turns possible getting information from Raspberry, such as GPU/CPU temperature, serial number, IP, etc.

1. Add this module to Gladys:

   * Name: `Gladys-Raspberry`
   * Version: `0.1.0`
   * URL: `https://github.com/piznel/Gladys-Raspberry-Info.git`
   * Slug = `rpi-info`

2. Restart Gladys.

3. 3 devices have been created, allowing to follow:

     * CPU temperature
     * GPU temperature
     * CPU voltage

In the "Module Configuration" page, you will also find information about your Raspberry, as well as statistics such as "memory" and "network".  
You can also directly type "console" commands, such as :  

* `lsusb` : gives the list of devices connected in USB.
* `lsusb -v | grep -Ei '(idVendor)'` : List all devices in your system (only vendor name).
* `lsusb -t`: Find USB device supported speeds by using tree structure option.
* `ifconfig` : To check which network the wireless adapter is using.
* `iwlist wlan0 scan` : Prints a list of the currently available wireless networks "wlan0".
* `cat /proc/partitions` : reveals the size and number of partitions on your SD card or HDD.
* `nmap -sP 192.168.0.*`: check which hosts are live and up in Network "192.168.0.*"
