#!/usr/bin/env python

"""
A simple demo that shows how to use FloatCanvas to draw rectangles on the screen

Note: this is now broken -- the events are not getting to the Rubber Band Box object.
      It should be re-factored to use GUIMode
"""


import wx

## import a local version
#import sys
#sys.path.append("..")
#from floatcanvas import NavCanvas, FloatCanvas, Resources, Utilities, GUIMode
#from floatcanvas.Utilities import GUI

## import the installed version
from wx.lib.floatcanvas import NavCanvas, FloatCanvas, GUIMode
from wx.lib.floatcanvas.Utilities import GUI

import numpy as N

import json

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

        '''
        Rot = event.GetWheelRotation()
        Rot = Rot / abs(Rot) * 0.1
        if event.ControlDown(): # move left-right
            self.Canvas.MoveImage( (Rot, 0), "Panel" )
        else: # move up-down
            self.Canvas.MoveImage( (0, Rot), "Panel" )
        '''


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
            for entry in data['edges']:
                # Draw the outer edges of the PCB.
                self.Canvas.AddLine(((entry['start'][0],entry['start'][1]),(entry['end'][0],entry['end'][1])))

            for entry in data['F']:
                # Draw the outer edges of the PCB.
                pointStart = (entry['start'][0],entry['start'][1])
                pointEnd   = (entry['end'][0],entry['end'][1])
                lineWidth  = float(entry['width'])
                self.Canvas.AddLine((pointStart, pointEnd), LineWidth=lineWidth )

app = wx.App()
DrawFrame(None, -1, "FloatCanvas Rectangle Drawer", wx.DefaultPosition, (700,700) )
app.MainLoop()
    
    
    
    









