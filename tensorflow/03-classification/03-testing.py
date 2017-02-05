
import os
import numpy as np
import gzip as gz
import urllib
import matplotlib.pyplot as plt
import tensorflow as tf
import random
from tensorflow.examples.tutorials.mnist import input_data

SOURCE_URL = 'http://yann.lecun.com/exdb/mnist/'

training_epochs = 25
batch_size = 100
display_step = 1

mnist = input_data.read_data_sets('MNIST_data/', one_hot=True)

X = tf.placeholder('float', [None, 784])
Y = tf.placeholder('float', [None, 10])

learning_rate = 0.1

W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))

activation = tf.nn.softmax(tf.matmul(X, W) + b)

cost = tf.reduce_mean(-tf.reduce_sum(Y * tf.log(activation), reduction_indices=1))
optimizer = tf.train.GradientDescentOptimizer(learning_rate).minimize(cost)

init = tf.global_variables_initializer()

with tf.Session() as sess:
    sess.run(init)

    for epoch in range(training_epochs):
        avg_cost = 0.
        total_batch = int(mnist.train.num_examples/batch_size)

        for i in range(total_batch):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)
            sess.run(optimizer, feed_dict={X: batch_xs, Y: batch_ys})
            avg_cost += sess.run(cost, feed_dict={X: batch_xs, Y: batch_ys}) / total_batch

        if epoch % display_step == 0:
            print('Epoch:', '%04d' % (epoch + 1), 'cost=', '{:.9f}'.format(avg_cost))

    print('Optimization Finished!')

    correct_prediction = tf.equal(tf.argmax(activation, 1), tf.argmax(Y, 1))
    accuracy = tf.reduce_mean(tf.cast(correct_prediction, 'float'))
    print('Accuracy:', accuracy.eval({X: mnist.test.images, Y: mnist.test.labels}))

    r = random.randint(0, mnist.test.num_examples - 1)
    print('Label: ', sess.run(tf.argmax(mnist.test.labels[r:r+1], 1)))
    print('Prediction: ', sess.run(tf.argmax(activation, 1), {X: mnist.test.images[r:r+1]}))

plt.imshow(mnist.test.images[r:r+1].reshape(28, 28), cmap='Greys', interpolation='nearest')
plt.show()
