#!/usr/bin/bash

aws rekognition update-dataset-entries\
  --dataset-arn dataset_arn \
  --changes '{"GroundTruth" : "{\"source-ref\":\"s3://your_bucket/your_image\",\"BB\":{\"annotations\":[{\"left\":1776,\"top\":1017,\"width\":458,\"height\":317,\"class_id\":0},{\"left\":1797,\"top\":1334,\"width\":418,\"height\":415,\"class_id\":1},{\"left\":2597,\"top\":1361,\"width\":655,\"height\":329,\"class_id\":2},{\"left\":2581,\"top\":1020,\"width\":689,\"height\":338,\"class_id\":3}],\"image_size\":[{\"width\":4000,\"height\":2667,\"depth\":3}]},\"BB-metadata\":{\"job-name\":\"labeling-job/BB\",\"class-map\":{\"0\":\"comparator\",\"1\":\"pot_resistor\",\"2\":\"ir_phototransistor\",\"3\":\"ir_led\"},\"human-annotated\":\"yes\",\"objects\":[{\"confidence\":1},{\"confidence\":1},{\"confidence\":1},{\"confidence\":1}],\"creation-date\":\"2021-06-22T10:10:48.492Z\",\"type\":\"groundtruth/object-detection\"}}" }' \
  --cli-binary-format raw-in-base64-out \
  --profile custom-labels-access


aws s3 sync ./training-dataset s3://playing-cards-rekognition/training/
aws s3 sync ./testing-dataset s3://playing-cards-rekognition/test/
