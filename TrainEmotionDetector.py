from tensorflow import keras
from keras.layers import Conv2D, MaxPooling2D, BatchNormalization
from keras.layers import Dense, Flatten, Activation
from keras.losses import categorical_crossentropy
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from matplotlib import pyplot as plt

num_features = 32
num_labels = 7
batch_size = 64
epochs = 70
width, height = 48, 48

# Initialize image data generator with rescaling
train_data_gen = ImageDataGenerator(rescale=1. / 255)
validation_data_gen = ImageDataGenerator(rescale=1. / 255)