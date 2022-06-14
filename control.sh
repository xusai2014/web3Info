#!/usr/bin/env bash

#应用名
APP_NAME=./node_modules/.bin/next

#应用根目录
APP_HOME=${AONE_APP_PATH}/

#进程ID
pid=0

cd $APP_HOME

#============================================
# 获取进程ID
#============================================
checkpid() {
   pid=`pgrep ${APP_NAME}`
   if [ -z $pid ]; then
      pid=0
   fi
}

#============================================
# 启动进程
#============================================
start() {
   checkpid
   if [ $pid -ne 0 ]; then
      echo "================================"
      echo "warn: $APP_NAME already started! (pid=$pid)"
      echo "================================"
   else
      echo -n "Starting $APP_NAME ..."
      #CMD="nohup node hello.js > ${AONE_LOG_PATH}/${APP_NAME}.log 2>&1 &"
      CMD="$APP_NAME start -p 80"
      sh -c "$CMD"
      checkpid
      if [ $pid -ne 0 ]; then
         echo "(pid=$pid) [OK]"
         exit 0
      else
         echo "[Failed]"
         ps -ef
         exit 1
      fi
   fi
}

#============================================
# 停止进程
#============================================
stop() {
  checkpid
  if [ $pid -ne 0 ]; then
       sh -c "kill -9 $pid"
       flag=$?
       sleep 3
     if [ $flag -eq 0 ]; then
        echo "[$APP_NAME stop OK]"
         exit 0
     else
        echo "[$APP_NAME stop Failed]"
         exit 1
     fi
  fi
   echo "[$APP_NAME stop ]"
   exit 0
}

#============================================
# 进程状态
#============================================
status() {
   checkpid
   if [ $pid -ne 0 ];  then
      echo "$APP_NAME is running! (pid=$pid)"
   else
      echo "$APP_NAME is not running"
   fi
}

case "$1" in
   'start')
      start
      ;;
   'stop')
     stop
     ;;
   'status')
     status
     ;;
  *)
  echo "Usage: $0 {start|stop|status}"
  exit 1
esac
exit 0
