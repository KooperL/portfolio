import tkinter as tk
import math
import numpy as np
from noise import pnoise2
#import time

#https://medium.com/quick-code/3d-graphics-using-the-python-standard-library-99914447760c
#https://stackoverflow.com/questions/43858836/python-installing-clarifai-vs14-0-link-exe-failed-with-exit-status-1158
#https://engineeredjoy.com/blog/perlin-noise/
#https://medium.com/@yvanscher/playing-with-perlin-noise-generating-realistic-archipelagos-b59f004d8401

points = []
triangle = []
ticker = 0
size = 20
scaling_factor = 2
perspective_factor = 2
#perlin scale for intensity
#engine sclae for zoom


def perlin_array(shape = (size*scaling_factor*2+1, size*scaling_factor*2+1),
			scale=10, octaves = 12,     #scale = 100
			persistence = 0.025, 
			lacunarity = 2.0, 
			seed = None):
    global ready
    if not seed:

        seed = np.random.randint(0, 100)
        print("seed was {}".format(seed))

    arr = np.zeros(shape)
    for i in range(shape[0]):
        for j in range(shape[1]):
            arr[i][j] = pnoise2(i / scale,
                                        j / scale,
                                        octaves=octaves,
                                        persistence=persistence,
                                        lacunarity=lacunarity,
                                        repeatx=1024,
                                        repeaty=1024,
                                        base=seed)
##    max_arr = np.max(arr)
##    min_arr = np.min(arr)
##    norm_me = lambda x: (x-min_arr)/(max_arr - min_arr)
##    norm_me = np.vectorize(norm_me)
##    arr = norm_me(arr)
    return arr


class Engine:
    def __init__(self, points, triangles, height=400, width=600):
        self.distance = 6
        self.triangles = triangles
        self.scale=30 #30
        self.window = tk.Tk()
        self.window.title('3D Graphics')
        self.image = tk.Canvas(self.window, width=width, height=height)
        self.image.pack()
        self.height = height
        self.width = width
        self.points = points
        self.trangles = triangles
        self.shapes = []

    def flattenPoint(self, point):
        (x, y, z) = (point[0], point[1], point[2])
        projectedY = int(self.height / 2 + ((y * self.distance) / (z + self.distance)) * self.scale)
        projectedX = int(self.width / 2 + ((x * self.distance) / (z + self.distance)) * self.scale)
        return (projectedX, projectedY)
    
    def createTriangle(self, points):
        a, b, c = points[0], points[1], points[2]
        coords = [a[0], a[1], b[0], b[1], c[0], c[1]]
        self.shapes.append(self.image.create_polygon(coords, fill="", outline="black"))

    def render(self):
        coords = []
        
        for point in self.points:
            coords.append(self.flattenPoint(point))
        try:    
            for triangle in self.triangles:
                self.createTriangle((coords[triangle[0]],coords[triangle[1]], coords[triangle[2]]))
        except IndexError:
            print("Ticker limit reached")
            




list_dims = range(int(-size*scaling_factor), int(size*scaling_factor)+1, 1)

y_matrix = np.array(list_dims)
x_matrix = np.array(list_dims)
array = perlin_array()

ticker = len(list_dims)*3+3


def draw():
    global ticker
    global points
    global triangle
    for row, y in enumerate(y_matrix):
        row2 = row + 1
        for column, x in enumerate(x_matrix):
            points.append((x,y,((len(y_matrix)-row)/perspective_factor)+array[column-1][row-1]*-4))
            points.append((x+1,y,((len(y_matrix)-row)/perspective_factor)+array[column][row-1]*-4))
            points.append((x,y+1,((len(y_matrix)-row-1)/perspective_factor)+array[column-1][row]*-4))
            triangle.append((ticker, ticker+1, ticker+2))
            ticker += 3

draw()

test = Engine(points, triangle)
test.render()
