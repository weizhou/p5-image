p5Image({
    "target": "p5Image1",   
    "height": 300,
    "src": "./images/lenna.png",
    "filters": '{"GrayscaleFilter": {}}'
});

p5ImageBlend({
    "target": "p5ImageBlend1",   
    "height": 300,
    "src1": "./images/lenna.png",
    "src2": "./images/arrow.png",
    "mode": "AddBlender",
    "param": {"colorToReplace": [0.0, 0.0, 0.0],
              "thresholdSensitivity": 0.001,
              "smoothing": 0.0
             }
});