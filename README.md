# SocialAR
This is the repo for scripts and codes used in project SocialAR

## Documentation
Please refer to [dropbox paper link](https://paper.dropbox.com/doc/SocialAR-Notes-6TSHl3oPgzUif8aPqybtK) for meeting updates, the content in the doc folder will not be regularly updated.

## Scripts
- Study1
  - getInfo / methods: retreive gaze positions from pupil player's output
  - filter: script for filtering out distracted segments 
  - normalize: script for equal smapling
  - distribute: categorize data points by ecc. and angle
  - plot: draw the result of distribute onto a polar coordinate system
  - face_transform: calculate the ratio of points and face
  - eye_tag: tag eyes' position on the given video
- Study2
  - rate: calculate corresponding rates of click events
  - ButtonTriger: Arduino code for buttons
  - DisplayPrototype: website prototype for study2 display
 
## FAQ
### How to install kairos_face on workstation
Follow the instruction on karios_face repository, but because we don't have root access to workstation.
We have to use ```pip install --user .``` instead of ```pip install .```.
### Encounter Error: "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xa1 in position 20: invalid start byte". What to do?
Because workstation use ```tcsh``` shell ( can see by ```echo $SHELL```), we can use ```setenv``` to change environment.
Use ```setenv``` to check ```LC_ALL``` and ```LANG```, if they are not ```en_US.UTF-8```, then ```setenv LC_ALL en_US.UTF-8```.
  
