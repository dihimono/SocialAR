import os
import cv2
import sys
import kairos_face

# usage: python eye_tag.py [src_vedio] [dest_vedio]

SRC_FILE = sys.argv[1]
DEST_FILE = sys.argv[2]

kairos_face.settings.app_id = "547b58a3"
kairos_face.settings.app_key = "af0fb82360dc788f065442a276476984"
height = 1280
width = 720

cap = cv2.VideoCapture(SRC_FILE)

# Define the codec and create VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter(DEST_FILE, fourcc, 20.0, (height, width))

cnt = 0

while(cap.isOpened()):

	ret, frame = cap.read()

	if ret == True:

		cv2.imwrite("frame_tmp.jpg", frame)
		has_face = True
		try:
			print ("Send frame %d to Kairos" % cnt)
			recognized_faces = kairos_face.detect_face(file="frame_tmp.jpg")
		except kairos_face.exceptions.ServiceRequestError:
			has_face = False

		if (has_face):

			print ("Calculate on frame %d" % cnt)
			r_Y = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'rightEyeCenterY')
			r_X = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'rightEyeCenterX')
			l_Y = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'leftEyeCenterY')
			l_X = recognized_faces.get(u'images')[0].get(u'faces')[0].get(u'leftEyeCenterX')

			cv2.circle(frame, (r_X, r_Y), 3, (0, 0, 255), -1)
			cv2.circle(frame, (l_X, l_Y), 3, (0, 0, 255), -1)

		# write the flipped frame
		out.write(frame)

		if cv2.waitKey(1) & 0xFF == ord('q'): break

	else: break
	cnt += 1

# Release everything if job is finished
os.remove("frame_tmp.jpg")
cap.release()
out.release()
cv2.destroyAllWindows()
