#include <stdio.h>
#include <opencv2/opencv.hpp>
#include <fstream>

using namespace cv;
using namespace std;
#include <iostream>

int main(int argc, char** argv)
{
    ofstream outfile("logs.txt", ios_base::app);

    if (argc < 3)
    {
        outfile << "Missing argument for desired filter" << endl;
        return -1;
    }

    const char* imagePath = argv[1];
    const char* filter = argv[2];

    Mat image;
    image = imread(imagePath);
    if ( !image.data )
    {
        outfile << "No image data found" << endl;
        return -1;
    }

    if (strcmp(filter, "grayscale") == 0)
    {
        cvtColor(image, image, COLOR_BGR2GRAY);
    }
    else if (strcmp(filter, "blur") == 0)
    {
        GaussianBlur(image, image, Size(5, 5), 0);
    }
    else if (strcmp(filter, "canny") == 0)
    {
        Mat edges;
        Canny(image, edges, 50, 150);
        image = edges;
    }
    else
    {
        outfile << "Filter not valid" << endl;
        return -1;
    }

    const char* processedImagePath = "processed_image.jpg";
    imwrite(processedImagePath, image);

    outfile << "Image successfully processed" << endl;
    outfile.close();

    return 0;
}
