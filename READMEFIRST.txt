#if you borrow codes, then referring to devaajaukkeli is appreciated

------------------------------------
#prototype 0.1

#Controlinterface
control_interface.html

#js files explained
jquery.js <- borrowed library from jquery team
script2.js <- response logic for controlinterface
skriptit.js <- ajax functions for calling php files

#php files to interface with python
move.php <- calls gpio_ctrl.py with moving directions
scan.php <- calls sarja.py script
coord_ret.php <- returns x,y scan coordinates from session for js to handle
init.php <- initializes current session
count_ret.php <- returns realtime value of measured points in 360 scan
lol_it.php <- gets coordinates from db even while sarja.py saves them in real time

#python files to command arduino
sarja.py <- gets 2d 360 ultrasonic-scan data from arduino, usin python serial
gpio_ctrl.py <- sets motor control pins according given input

youtube link to proto 0.1 showoff:
https://youtu.be/PLiizU5BBGU

------------------------------------
#prototype 0.2
New incoming features for proto 0.2
 - AI, map search
 - hull, wood
 - arduino - magnetic compass, additional ultrasonic sensor