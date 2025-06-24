#!/bin/bash
cd /home/kavia/workspace/code-generation/reactimagegallery-67220-0f37cd2f/gallery_frontend_workspace/gallery_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

