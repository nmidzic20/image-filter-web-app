A web application created with HTML/CSS/JS on client side and using NodeJS/Express on server side.

The application serves as image filter, using C++ with OpenCV on server side to optimise image processing.

# Description

In addition to web frameworks specifically written for server-side development in C++, there is the possibility of running programs written in C++ by servers written in other languages. This could be applied in cases where a task requires processing in C++ and the appropriate parameters are passed to the program, and the result of the program is returned to the client by the server side. An example of a web application that uses this case can be shown when processing an image. Image processing is an area that is computationally demanding due to complex algorithms applied to images and a large number of calculations for each individual pixel, and the execution of that part can be left to a C++ program, while a server written in NodeJS or another framework only receives requests from the client, submits the necessary parameters to the program and receives an image from it, which it returns to the client. In this case, OpenCV, an open computer vision and image processing library that offers a C++ interface to tools for image and video analysis and manipulation, can be used for image processing.

# Demo

![web app demo](./demo.png)
