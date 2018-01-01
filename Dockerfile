FROM node
RUN mkdir /opt/uuDockitHelper
ADD demo  /opt/uuDockitHelper/demo
ADD package.json /opt/uuDockitHelper
RUN cd /opt/uuDockitHelper/; npm install

CMD cd /opt/uuDockitHelper/; npm start




