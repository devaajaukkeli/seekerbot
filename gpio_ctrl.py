#!/usr/bin/env python
import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(7,GPIO.OUT)
GPIO.setup(8,GPIO.OUT)
GPIO.setup(9,GPIO.OUT)
GPIO.setup(10,GPIO.OUT)

def stopmoving():
    GPIO.output(7,0)
    GPIO.output(8,0)
    GPIO.output(9,0)
    GPIO.output(10,0)

def motor1forward():
    GPIO.output(9,0)
    GPIO.output(10,1)

def motor1backward():
    GPIO.output(9,1)
    GPIO.output(10,0)

def motor2forward():
    GPIO.output(7,0)
    GPIO.output(8,1)
def motor2backward():
    GPIO.output(7,1)
    GPIO.output(8,0)

print "Given argument: ", str(sys.argv[1])

move = int(sys.argv[1])

stopmoving()

if move == 1:
    motor1forward()
    motor2forward()
if move == 2:
    motor1backward()
    motor2backward()
if move == 3:
    motor1forward()
if move == 4:
    motor2forward()
if move == 5:
    motor1forward()
    motor2backward()
if move == 6:
    motor2forward()
    motor1backward()
