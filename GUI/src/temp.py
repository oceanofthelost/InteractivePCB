#!/usr/bin/env python

"""
This demonstrates how to use FloatCanvas with a coordinate system where
X and Y have different scales. In the example, a user had:
X data in the range: 50e-6 to 2000e-6
Y data in the range: 0 to 50000
-chb
"""

import wx

## import the installed version
#from wx.lib.floatcanvas import NavCanvas, FloatCanvas

## import a local version
import sys
sys.path.append("..")
from wx.lib.floatcanvas import NavCanvas, FloatCanvas, GUIMode

import numpy as N
import numpy.linalg as NL


class DrawFrame(wx.Frame):

    """
    A frame used for the FloatCanvas Demo
    """

    def __init__(self, *args, **kwargs):
        wx.Frame.__init__(self, *args, **kwargs)

        self.CreateStatusBar()

        # Add the Canvas
        Canvas = NavCanvas.NavCanvas(self,-1,
                                     size = (500,500),
                                     ).Canvas
      
        self.Canvas = Canvas
        
        FloatCanvas.EVT_MOTION(self.Canvas, self.OnMove ) 
        PointA = (-1,-1)
        PointB = (-1,1)
        PointC = (1,1)
        PointD = (-1,1)

        roundness = 1
        self.DrawRoundedCornner(PointA, PointB, PointC, roundness)
        #self.DrawRoundedCornner(PointB, PointC, PointD, roundness)
        #self.DrawRoundedCornner(PointC, PointD, PointA, roundness)
        #self.DrawRoundedCornner(PointD, PointA, PointB, roundness)
        
        self.Show()
        Canvas.ZoomToBB()


    def DrawRoundedCornner(self,PointA, PointB, PointC, roundness):
        self.Canvas.AddLine((PointA, PointB))
        self.Canvas.AddLine((PointB, PointC))

        if roundness < 0:
          roundness = 0
        elif roundness > 1:
          roundness = 1

        p1 = N.asarray(PointA)
        p2 = N.asarray(PointB)
        p3 = N.asarray(PointC)
        
        v1 = p1 - p2
        v2 = p3 - p2
        
        v1_norm = v1/NL.norm(v1)
        v2_norm = v2/NL.norm(v2)

        endPoint   = (p2+v1_norm*roundness)
        startPoint = (p2+v2_norm*roundness)

        centerPoint = (v1+v2)/2
        self.Canvas.AddLine([startPoint, endPoint])
        #self.Canvas.AddArc(startPoint, endPoint, centerPoint)

        '''
        for i in range(1,101):
            roundness = i /100
            endPoint   = (p2-v1_norm*roundness)
            startPoint = (p2+v2_norm*roundness)

            centerPoint = (p1+p3)/2
           
            print(endPoint)
            print(startPoint)
            print(centerPoint)
            #self.Canvas.AddPoint(centerPoint, Diameter=10)
            self.Canvas.AddLine([startPoint, endPoint])
            self.Canvas.AddArc(startPoint, endPoint, centerPoint)
        '''
    def OnMove(self, event):
        """
        Updates the status bar with the world coordinates
        """
        self.SetStatusText("%.2g, %.2g"%tuple(event.Coords))


app = wx.App(False)
F = DrawFrame(None, title="FloatCanvas Demo App", size=(700,700) )
app.MainLoop()