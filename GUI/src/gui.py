#importing wx files
import wx
import wx.adv
import wx.dataview as dv

import os

import BOM_Tool
from wx.lib.floatcanvas import FloatCanvas
 
# Extend the gui with some new functionality
class MyFrame(BOM_Tool.MainFrame):
    def __init__(self, parent):
        BOM_Tool.MainFrame.__init__(self, parent)

        # Set the icon for the application.
        self.programIcon =  wx.Icon("./icon-bill-of-materials.ico")
        self.SetIcon(self.programIcon)

    # Virtual event handlers, overide them in your derived class
    def onMove( self, event ):
        """
        Updates the status bar with the world coordinates
        """
        self.SetStatusText("%.2g, %.2g"%tuple(event.Coords))



    def onAbout(self, event):
        info = wx.adv.AboutDialogInfo()
        info.Name = "BOM TOOL NAME"
        info.Version = "1.0.0"
        info.Copyright = "2019"
        info.Description = (
            "SUPER COOL BOM TOOL DESCRIPTION"
            )

        info.SetIcon(self.programIcon)
        # Then we call wx.AboutBox giving it that info object
        wx.adv.AboutBox(info) 

####################################################################################################

def main():
    app = wx.App()
    frame = MyFrame(None)
    frame.Show()
    app.MainLoop()


if __name__ == '__main__':
    main()