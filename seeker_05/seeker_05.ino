#include<stdio.h>
int one_datastep = 0;
int reverse = 0;
char data;
int P1 = 10;
int E1 = 11;//left, looked from behind
int P2 = 8;
int E2 = 9;//right, lfb
int S1 = 12;
int D1 = 13;
long int value1 = 0;
long int value2 = 0;
int step_ctr = 0;
int get_amount = 0;
int turn_front = 0;
int turned = 0;
int data_send = 0;
void setup()
{
  Serial.begin(9600);
  pinMode(S1,OUTPUT);
  pinMode(D1,OUTPUT);
  pinMode(P1,OUTPUT);
  pinMode(P2,OUTPUT);
  pinMode(E1,INPUT);
  pinMode(E2,INPUT);
}

void loop()
{
  while(Serial.available()>0)//data incoming
  {
//    Serial.println("Seekerbot received command!");
    data = Serial.read();
    if(data == 'S' || data == 's')
    {
      //Serial.print("Received ");
      one_datastep = 1;
    }
    else if(data == 'e')
    {
      reverse = 1;
    }
    else if (data == 'f')
    {
      turn_front = 1;
    }
    else if(data == 'b')
    {
      turn_front = 2;
    }
    else if(data = 'd')
    {
      data_send = 1;
    }
    else if(data == 'r'||data=='R')
    {
      //get_amount = 1;
    }
    else if(data == ':')
    {
      //get_amount = 2;
    }/*
    else
    {
      if(get_amount == 1)
      {
      }
      else if(get_amount == 2)
      {
      }
    }*/
  }
  get_amount = 0;
  data = 'N';
  if(turn_front == 1)
  {
    for(int i = 0;i<50;i++)
    {
      step_one(1);
    }
    turn_front = 0;
  }
  else if(turn_front == 2)
  {
    for(int i = 0;i<50;i++)
    {
      step_one(0);
    }
    turn_front =  0;
  }
  if(one_datastep)
  {
    one_datastep = 0;
//    value1 = read_value(1);
//    value2 = read_value(2);
//    Serial.print("[");
    Serial.print(read_value(1));
    Serial.print(":");
    Serial.println(read_value(2));
//    Serial.print("]");
    step_one(1);
    step_ctr++;
  }
  if(data_send == 1)
  {
    data_send = 0;
    long data = read_value(1);
    data = (data/2)/29.1;
    Serial.print(data);
    Serial.print("\n");
  }
  if(reverse == 1)
  {
    reverse = 0;
    for(int i=0;i<step_ctr;i++)
    {
      step_one(0);
    }
    step_ctr = 0;
  }
}
long read_value(unsigned int n)
{
  long value = 0;
  if(n==1)//ultrasonic1
  {
    digitalWrite(P1,HIGH);
    delayMicroseconds(10);
    digitalWrite(P1,LOW);
    value = pulseIn(E1,HIGH);
  }
  if(n==2)//ultrasonic2
  {
    digitalWrite(P2,HIGH);
    delayMicroseconds(10);
    digitalWrite(P2,LOW);
    value = pulseIn(E2,HIGH);
  }
  return value;
}
void step_one(int d)
{
  digitalWrite(D1, d);
  digitalWrite(S1, 1);
  delay(8);
  digitalWrite(S1, 0);
  delay(8);
  //Serial.println("Step");
}
