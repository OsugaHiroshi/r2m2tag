curl http://localhost:5000/payload \
  -X POST \
  -H 'content-type: application/json' \
  -H 'User-Agent: GitHub-Hookshot/18889e1' \
  -H 'X-GitHub-Delivery: 852f2ba0-5a64-11e7-80a5-582d71c9778c' \
  -H 'X-GitHub-Event: pull_request' \
  -d @test.json
