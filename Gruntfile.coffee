module.exports = (grunt) ->
  require('load-grunt-tasks') grunt
  require('time-grunt') grunt
  grunt.initConfig
    sshconfig:
      'myhost_qa': grunt.file.readJSON 'tc.host'
      'myhost_prod': grunt.file.readJSON 'tc_prod.host'
    sshexec:
      restart_qa:
        command: "export NODE_ENV=qa;cd /root/oauth2srv;forever stop ./app.js;forever start ./app.js"
        options: config: 'myhost_qa'
      restart_prod:
        command: "export NODE_ENV=prod;cd /root/oauth2srv;forever stop ./app.js;forever start ./app.js"
        options: config: 'myhost_prod'      
    sftp:
      qa:
        files:  './': ['**/*.*', '!**/node_modules/**']
        options:
          config: 'myhost_qa'
          path: '/root/oauth2srv/'
          srcBasePath: '.'
          createDirectories: true
      prod:
        files:  './': ['**/*.js', '**/*.html', '!**/node_modules/**']
        options:
          config: 'myhost_prod'
          path: '/root/oauth2srv/'
          srcBasePath: '.'
          createDirectories: true

  grunt.registerTask 'run-remote-qa', [
    'sftp:qa'
    'sshexec:restart_qa'
  ]
  
  grunt.registerTask 'run-remote-prod', [
    'sftp:prod'
    'sshexec:restart_prod'
  ]