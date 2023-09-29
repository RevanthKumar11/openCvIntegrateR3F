import cv2
import numpy as np
from cvzone.ColorModule import ColorFinder
import cvzone
import json
import socket


myColorFinder = ColorFinder(False)
hsvVals = {'hmin': 90, 'smin': 77, 'vmin': 101, 'hmax': 109, 'smax': 239, 'vmax': 244}

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverAddressPort = ('192.168.137.1', 1999) 

def video():
    camera = cv2.VideoCapture(0)
    camera.set(3, 1280)
    camera.set(4, 720)
    while True:
        success, org_img = camera.read()
        h, w, _ = org_img.shape
        imgColor, mask = myColorFinder.update(org_img, hsvVals)
        imgContour, contours = cvzone.findContours(org_img, mask, minArea= 1000)
        # imgStack = cvzone.stackImages([org_img, imgColor, mask, imgContour], 2, 0.5)

        if contours: 
            data =  contours[0]['center'][0], \
                    h - contours[0]['center'][1],\
                    int(contours[0]['area'])
            print(data)
            sock.sendto(str.encode(str(data)), serverAddressPort)
            
           

        # show the camera``
        # cv2.imshow('image', imgStack)
        imgContour =  cv2.resize(imgContour, (0, 0), None, 0.3, 0.3)
        cv2.imshow('imgContour', imgContour)
        #
        if cv2.waitKey(1) == ord('a'):
            break

    camera.release() 
    cv2.destroyAllWindows()

video()