const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {populateFacilities, facility} = require('./seed/facility');

// beforeEach(populateUsers);
beforeEach(populateFacilities);
// write test cases

describe('POST /admin/facility', () => {
    it('should create a new facility item', (done) => {
        var item = 'test item';

        request(app)
            .post('/admin/facility')
            // .set('x-auth', users[0].tokens[0].token)
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done);
    });
});

describe('POST /admin/facility', () => {
    it('should not create a duplicated facility item', (done) => {
        var item = 'First item'
        var expectText = 'Facility item is aleardy existed'

        request(app)
            .post('/admin/facility')
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe(expectText);
            })
            .end(done);
    });
});

describe('GET /admin/facilities', () => {
    it('should get a list of facility items', (done) => {
        request(app)
            .get('/admin/facilities')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
});

describe('PATCH /admin/facility/:id', () => {
    it('should update an existing facility item', (done) => {
        var id = facility[0]._id.toHexString();
        var item = 'update first item';

        request(app)
            .patch(`/admin/facility/${id}`)
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done)
    });
});

describe('DELETE /admin/facility', () => {
    it('should delete a facility item', (done) => {
        var id = facility[0]._id.toHexString();
        var item = 'First item';
        request(app)
            .delete(`/admin/facility/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done)
    })
})



