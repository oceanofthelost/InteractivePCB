#!/usr/bin/env python

import wx


## import the installed version
from wx.lib.floatcanvas import NavCanvas, FloatCanvas, GUIMode
from wx.lib.floatcanvas.Utilities import GUI

import numpy as N

import json

def transform(x, y, cx, cy, theta_degree):
    theta = N.deg2rad(theta_degree)
    newX = cx + (x*N.cos(theta)-y*N.sin(theta))
    newY = cy + (x*N.sin(theta)+y*N.cos(theta))
    return (newX, newY)

class DrawFrame(wx.Frame):

    """
    A frame used for the FloatCanvas Demo

    """

    def __init__(self,parent, id,title,position,size):
        wx.Frame.__init__(self,parent, id,title,position, size)

        self.CreateStatusBar()            
        # Add the Canvas

        self.InMoveMode = False
        
        self.Canvas = FloatCanvas.FloatCanvas(self, -1,
                             size=(500, 500),
                             ProjectionFun = None,
                             Debug=0,
                             BackgroundColor="White",
                             )


        self.Canvas.Bind(FloatCanvas.EVT_MOTION, self.OnMove) 

        # use the GUIMove class as the move interrupt. This automatically 
        # takes care of the scaling and moving of the image.
        self.Canvas.SetMode(GUIMode.GUIMove())
        
        self.DrawPCB()

        self.Canvas.ZoomToBB()



        self.Show(True)
        return None




    def OnMove(self, event):
        """
        Updates the status bar with the world coordinates
        """
        self.SetStatusText("%.2g, %.2g"%tuple(event.Coords))


    def OnWheel(self, event):
        point = (event.Coords)
        if event.GetWheelRotation() < 0:
            self.Canvas.Zoom(0.9, point, centerCoords = "pixel", keepPointInPlace=True)
        else:
            self.Canvas.Zoom(1.1, point, centerCoords = "pixel", keepPointInPlace=True)



    def dummyHandler(self, evt):
        evt.Skip()


    def DrawPCB(self):
        with open('data.json', 'r') as json_file:
            data = json.load(json_file)

            # Draw PCB board outline. 
            for entry in data['board_shape']:
                # Draw the outer edges of the PCB.
                if entry['type'] == 'line':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    width = entry['width']
                    self.Canvas.AddLine((startPoint,endPoint), LineWidth=width)
                elif entry['type'] == 'arc':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    centerPoint = (entry['center'][0],entry['center'][1])
                    width = entry['width']
                    self.Canvas.AddArc(startPoint, endPoint, centerPoint, LineWidth=width)
                elif entry['type'] == 'circle':
                    centerPoint = (entry['center'][0],entry['center'][1])
                    diameter = entry['radius']*2
                    width = entry['width']
                    self.Canvas.AddCircle(centerPoint, diameter, LineWidth=width)
            # Draw tof silkscreen
            for entry in data['silkscreen_top']:
                # Draw the outer edges of the PCB.
                if entry['type'] == 'line':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    width = entry['width']
                    self.Canvas.AddLine((startPoint,endPoint), LineWidth=width, LineColor='YELLOW GREEN')
                elif entry['type'] == 'arc':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    centerPoint = (entry['center'][0],entry['center'][1])
                    width = entry['width']
                    self.Canvas.AddArc(startPoint, endPoint, centerPoint, LineWidth=width, LineColor='YELLOW GREEN')
                elif entry['type'] == 'circle':
                    centerPoint = (entry['center'][0],entry['center'][1])
                    diameter = entry['radius']*2
                    width = entry['width']
                    self.Canvas.AddCircle(centerPoint, diameter, LineWidth=width, LineColor='YELLOW GREEN')

            for module in data['modules']:
                # TOD: Is there a way to simpliffy the following reference for the module?
                for pad in data['modules'][module]['pads']:
                    if pad['layers'] == "F":
                        # smd pad is square
                        if pad['roundness'] == 0:
                            theta = pad['angle']
                            w = pad['size'][0]
                            l = pad['size'][1]
                            point1 = transform(-w/2, l/2 , pad['pos'][0], pad['pos'][1], theta)
                            point2 = transform(w/2 , l/2 , pad['pos'][0], pad['pos'][1], theta)
                            point3 = transform(w/2 , -l/2, pad['pos'][0], pad['pos'][1], theta)
                            point4 = transform(-w/2, -l/2, pad['pos'][0], pad['pos'][1], theta)
                            self.Canvas.AddPolygon([point1, point2, point3, point4])
                        elif pad['roundness'] == 100:
                            diameter = pad['size'][1]
                            self.Canvas.AddCircle((pad['pos'][0], pad['pos'][1]), diameter)


app = wx.App()
DrawFrame(None, -1, "FloatCanvas Rectangle Drawer", wx.DefaultPosition, (700,700) )
app.MainLoop()
    
    
    
    









