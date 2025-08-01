#!/bin/bash
cd /home/kavia/workspace/code-generation/frontend-prototype-implementation-19433-19442/frontend_reach_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

