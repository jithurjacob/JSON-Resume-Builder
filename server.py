from flask import Flask,make_response,render_template, request, jsonify, json
import os,json
#import sqlite3

#port = int(os.getenv('PORT', 8000))

app = Flask(__name__)

@app.route('/json/<path>')
def jsonfn(path):
    print path
    #return app.send_static_file('train.csv')# 
    return app.send_static_file('json/'+path)   

@app.route('/resume', methods=['POST'])
def resume():
    headers = {'Content-Type': 'text/html'}
    data = request.get_json('resume')
    return make_response(render_template('resume.html',data=data),200,headers)

@app.route('/view/<path>')
def viewresume(path):
    
    headers = {'Content-Type': 'text/html'}
    with open("static/saved/"+path) as f:
        cont = f.read()
        data = json.loads(cont)
    return make_response(render_template('resume.html',data=data),200,headers)


@app.route('/saveResume/<path>', methods=['POST'])
def saveResume(path):
    filename =  path
    data = request.get_json('resume')#.get("resume")
    with open("static/saved/"+(filename+".json"),"w") as f:
        f.write(json.dumps(data))
    return "Resume saved successfully"
@app.route('/new')
def new():
    return make_response(render_template('new.html'),200)
@app.route('/')
def index():
        print "hi"
        #headers = {'Content-Type': 'text/html'}
        #conn = sqlite3.connect('data.db', timeout=1)
        #query="select (select count(s.id) from students s) as total,(select count(s.id) from students s where  s.status='Unknown') as unknown,(select count(s.id) from students s where s.status='Waiting') as waiting,(select count(s.id) from students s where  s.status='Joined') as joined,(select count(s.id) from students s where  s.status='NotJoining') as notjoining "
        #data=conn.execute(query).fetchone()
        #print data
        from os import listdir
        from os.path import isfile, join
        saved = [f for f in listdir("./static/saved/")]
        print saved
        return make_response(render_template('index.html',data=saved),200)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
