import serial
import time,sys,math
from random import randint
from subprocess import call
import MySQLdb

#arduino USB
try:
    arduinoSER = serial.Serial('/dev/ttyACM0',9600,timeout=0.5)
    print "Setting usb nose"
    time.sleep(1)
except:
    print "No usb device in /dev/tty/ttyACM0\nClosing...\n"
    sys.exit()
data = [0]
id = 0
#coordinate db
try:
    db = MySQLdb.connect('localhost','seeker','password','coords')
    arduinoDB = db.cursor()
except:
    print "Connection to database 'coords' refused!"
    sys.exit()
def insertCoord(x,y,steps):
    try:
        #db = MySQLdb.connect('localhost','seeker','password','coords')
        #arduinoDB = db.cursor()
        #time.sleep(1)
        print "Step:",steps,"x:",x,"y:",y
        print "DB-handle"
        if steps < 2:
            print "Truncate"
            arduinoDB.execute("TRUNCATE TABLE newcoord")
            arduinoDB.execute("UPDATE counters SET ncoordctr = 1")
        arduinoDB.execute("INSERT INTO newcoord values(%s,%s,id)"%(str(int(x)),str(int(y))))
        arduinoDB.execute("UPDATE counters SET ncoordctr = ncoordctr + 1")
        db.commit()
        print "DB including ok"
        if arduinoDB.lastrowid:
            print('last insert id',arduinoDB.lastrowid)
    except MySQLdb.Error, e:
        print("Kusi: ",sys.exc_info()[0])
        print "Mysli kapinoi: %d:%s"%(e.args[0],e.args[1])
        pass
    finally:
        print "finalized one step"
        #arduinoDB.close()
        #db.close()
steps = 0

def get_data_from_arduino(steps):
    distance1 = 1.0
    distance2 = 1.0
    c = []
    arduinoSER.write("S\n")#added \n for performance purposes
    pituus = 1
    time1 = " "
    time2 = " "
    temp = " "
    a = 0
    print "reading usb"
    data[0] = arduinoSER.readline()
    print "usb received"
    pituus = len(data[0])
    for marker in data[0]:
        if marker==':':
            a = 1
        else:
            if a == 1:
                time2 += marker
            else:
                time1 += marker
        pituus = 0
    if len(time1)>2:
        distance1 = float(int(time1))/2.0/1000000.0 * 3430000.0
        distance2 = float(int(time2))/2.0/1000000.0 * 3430000.0
    #print "D1:",int(distance1),"mm"
    #print "D2:",int(distance2),"mm"
    PI = math.pi
    #in degrees
    Dalpha = float(steps)*1.8
    #in radians
    alpha = ((2.0*PI)/360.0)*Dalpha
    x1 = distance1 * math.cos(alpha)
    y1 = distance1 * math.sin(alpha)
    x2 = distance2 * math.cos(alpha+PI)
    y2 = distance2 * math.sin(alpha+PI)
    c.append(steps)
    c.append(int(x1))
    c.append(int(y1))
    c.append(int(x2))
    c.append(int(y2))
    #arduinoSER.write("e")
    return c

#arduino output format step:distancetimer
bx = 0
by = 0
while steps<=100:
    print "retrieve data"
    input = get_data_from_arduino(steps)
    print "data retrieved"
    if len(input)>1:
        steps += 1
        x = input[1]+bx
        y = input[2]+by
        insertCoord(x,y,steps)
        x = input[3]+bx
        y = input[4]+by
        insertCoord(x,y,steps)
    else:
        print "No data available"
arduinoSER.write("e")
arduinoDB.close()
db.close()
