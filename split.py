import cv2
import csv
import sys
import argparse
import kairos_face
import math
import time
from getInfo import getInfo

# How to use

# python split.py [gazedata.csv] [video] [dist_eyes] [dist_user]
# example : python split.py gazepositions.csv world_viz.mp4 6 61

# Field

kairos_face.settings.app_id = "547b58a3"
kairos_face.settings.app_key = "af0fb82360dc788f065442a276476984"
denormalization_height = 1920
denormalization_weight = 1080

# math function

def dist_two_points(x_a, x_b, y_a, y_b):
	return math.sqrt((x_a - x_b) ** 2 + (y_a - y_b) ** 2)

def angle_with_law_of_cosine(dist_a, dist_b, dist_c):
	return math.degrees(math.acos((dist_a ** 2 + dist_b ** 2 - dist_c ** 2) / (2 * dist_a * dist_b)))

def cross_product(vector_a_x, vector_a_y, vector_b_x, vector_b_y):
	return vector_a_x * vector_b_y - vector_a_y * vector_b_x
	
# Load

o = getInfo()
o.read_file(sys.argv[1])
o.processing((denormalization_height, denormalization_weight), True)

vidcap = cv2.VideoCapture(sys.argv[2])
count = 0
succes = True
required_frame = []

# Collect Required Frames

current_frame = -1
for item in o.ret:
	if (item[0] > current_frame):
		required_frame.append(item[0])
		current_frame = item[0]

# print required_frame	


# cv cut frame

success, image = vidcap.read()
count = 0
required_frame_index = 0
success = True

while success:
	success, image = vidcap.read()
	if (required_frame_index == len(required_frame)):
		break
	if (required_frame[required_frame_index] == count):
		print('Read a new frame: %d' % count)
		cv2.imwrite("frame%d.jpg" % count, image)
		required_frame_index += 1
	count += 1

# kairos

current_index = -1
with open('eyes.csv', 'w') as csvfile:
	spamwriter = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
	for index in o.ret:
		if ( current_index == index[0] ):
			continue
		has_face = True
		try:
			print ("Send frame %d to Kairos" % index[0])
			recognized_faces = kairos_face.detect_face(file="frame"+str(index[0])+".jpg")
		except kairos_face.exceptions.ServiceRequestError:
			has_face = False

		if (has_face):
			print ("Calculate on frame %d" % index[0])
			r_Y = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'rightEyeCenterY')
			r_X = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'rightEyeCenterX')
			l_Y = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'leftEyeCenterY')
			l_X = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'leftEyeCenterX')
			dist = dist_two_points(r_X, l_X, r_Y, l_Y)
			ratio = float(sys.argv[3]) / dist
			
			mid_X = (r_X + l_X) / 2
			mid_Y = (r_Y + l_Y) / 2

			gaze_X = index[2]
			gaze_Y = index[3]
			
			dist_mid_gaze = dist_two_points(gaze_X, mid_X, gaze_Y, mid_Y)
			dist_mid_l = dist_two_points(l_X, mid_X, l_Y, mid_Y)
			dist_gaze_l = dist_two_points(gaze_X, l_X, gaze_Y, l_Y)

			omega = angle_with_law_of_cosine(dist_mid_l, dist_mid_gaze, dist_gaze_l)
			if ( cross_product(l_X - mid_X, l_Y - mid_Y, gaze_X - mid_X, gaze_Y - mid_Y) < 0 ):
				omega = 360 - omega
			
			dist_mid_gaze_cm = dist_mid_gaze * ratio
			#phi = math.degrees(math.atan2( dist_mid_gaze_cm / float(sys.argv[4]) ))

			phi = math.degrees(math.atan( dist_mid_gaze_cm / float(sys.argv[4]) ))
			#print ("gaze : (%f, %f), mid : (%f, %f), right : (%f, %f)" % (gaze_X, gaze_Y, mid_X, mid_Y, l_X, l_Y))
			print ("write frame %d vision angle %f and deviation angle %f" % (index[0], phi, omega))
			spamwriter.writerow([index[0],phi,omega])
		
		current_index = index[0]
                time.sleep(1)
