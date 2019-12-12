from wx.lib.floatcanvas import NavCanvas, FloatCanvas, GUIMode
from wx.lib.floatcanvas.Utilities import GUI, BBox
import numpy as N
import json

def transform(x, y, cx, cy, theta_degree):
    theta = N.deg2rad(theta_degree)
    newX = cx + (x*N.cos(theta)-y*N.sin(theta))
    newY = cy + (x*N.sin(theta)+y*N.cos(theta))
    return (newX, newY)

# Using http://zetcode.com/wxpython/customwidgets/
# as an example for getting started 
class PCBCanvas(FloatCanvas.FloatCanvas):
    def __init__(self, parent, id):
        # Hard coding the default size of the canvas here. The master window size is 
        # 800x600. Taking the client size and dividing each dimension by 2 since the screen is divided 
        # in 2 in the x direction and the right side is divided in 2 for the top and bottom 
        # pcb displays.
        # There has to be a better way to do the default size than this.
        FloatCanvas.FloatCanvas.__init__(self, parent, id, size=(parent.GetClientSize()[0]/2, parent.GetClientSize()[1]/2))
        
        # use the GUIMove class as the move interrupt. This automatically 
        # takes care of the scaling and moving of the image.
        self.SetMode(GUIMode.GUIMove())

        self.DrawPCB()
        self.ZoomToBB(NewBB=self.GetBoundingBox())



    def GetBoundingBox(self):
        with open('data.json', 'r') as json_file:
            data = json.load(json_file)

            return BBox.asBBox([[data['pcb_bounding_box']['minx'], data['pcb_bounding_box']['miny'] ],[data['pcb_bounding_box']['maxx'], data['pcb_bounding_box']['maxy'] ]])
            #return BBox.asBBox([[-6, -6 ],[9, 100 ]])


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
                    self.AddLine((startPoint,endPoint), LineWidth=width)
                elif entry['type'] == 'arc':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    centerPoint = (entry['center'][0],entry['center'][1])
                    width = entry['width']
                    self.AddArc(startPoint, endPoint, centerPoint, LineWidth=width)
                elif entry['type'] == 'circle':
                    centerPoint = (entry['center'][0],entry['center'][1])
                    diameter = entry['radius']*2
                    width = entry['width']
                    self.AddCircle(centerPoint, diameter, LineWidth=width)
            # Draw tof silkscreen
            for entry in data['silkscreen_top']:
                # Draw the outer edges of the PCB.
                if entry['type'] == 'line':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    width = entry['width']
                    self.AddLine((startPoint,endPoint), LineWidth=width, LineColor='YELLOW GREEN')
                elif entry['type'] == 'arc':
                    startPoint = (entry['start'][0],entry['start'][1])
                    endPoint = (entry['end'][0],entry['end'][1])
                    centerPoint = (entry['center'][0],entry['center'][1])
                    width = entry['width']
                    self.AddArc(startPoint, endPoint, centerPoint, LineWidth=width, LineColor='YELLOW GREEN')
                elif entry['type'] == 'circle':
                    centerPoint = (entry['center'][0],entry['center'][1])
                    diameter = entry['radius']*2
                    width = entry['width']
                    self.AddCircle(centerPoint, diameter, LineWidth=width, LineColor='YELLOW GREEN')

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
                            self.AddPolygon([point1, point2, point3, point4], FillColor="GREY")
                        elif pad['roundness'] == 100:
                            diameter = pad['size'][1]
                            self.AddCircle((pad['pos'][0], pad['pos'][1]), diameter, FillColor="GREY")
