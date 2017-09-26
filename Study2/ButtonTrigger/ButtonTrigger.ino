#include <Keyboard.h>

const int yesButtonPin = 4;
const int noButtonPin = 5;
const int distractButtonPin = 0;
const int buttonPressedThreshold = 512;

boolean distractStatus = false;
boolean yesStatus = false;
boolean noStatus = false;

boolean distractPreStatus = false;
boolean yesPreStatus = false;
boolean noPreStatus = false;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(distractButtonPin, INPUT);
  pinMode(yesButtonPin, INPUT);
  pinMode(noButtonPin, INPUT);
  Keyboard.begin();
}                            

void loop() {
  
  distractPreStatus = distractStatus;
  yesPreStatus = yesStatus;
  noPreStatus = noStatus;
  
  distractStatus = analogRead(distractButtonPin) > buttonPressedThreshold;
  yesStatus = analogRead(yesButtonPin) > buttonPressedThreshold;
  noStatus = analogRead(noButtonPin) > buttonPressedThreshold;
  
  if ( !distractPreStatus && distractStatus ) {
    Serial.println("distract press");
    Keyboard.print(' ');
  }
  if ( !yesPreStatus && yesStatus ) {
    Serial.println("yes press");
    Keyboard.print('y');
  }
  if ( !noPreStatus && noStatus ) {
    Serial.println("no press");
    Keyboard.print('n');
  }

}


