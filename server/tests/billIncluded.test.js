const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {populateBillIncludeds, billIncludeds} = require('./seed/billIncluded');

// beforeEach(populateUsers);
beforeEach(populateBillIncludeds);
// write test cases

describe('POST /admin/bill-included', () => {
    it('should create a new bill included item', (done) => {
        var item = 'test item';

        request(app)
            .post('/admin/bill-included')
            // .set('x-auth', users[0].tokens[0].token)
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done);
    });
});

describe('POST /admin/bill-included', () => {
    it('should not create a duplicated bill included item', (done) => {
        var item = 'First item'
        var expectText = 'Already existed'

        request(app)
            .post('/admin/bill-included')
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.text).toBe(expectText);
            })
            .end(done);
    });
});

describe('GET /admin/bill-includeds', () => {
    it('should get a list of bill included items', (done) => {
        request(app)
            .get('/admin/bill-includeds')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(2);
            })
            .end(done);
    })
});

describe('PATCH /admin/bill-included/:id', () => {
    it('should update an existing bill included item', (done) => {
        var id = billIncludeds[0]._id.toHexString();
        var item = 'update first item';

        request(app)
            .patch(`/admin/bill-included/${id}`)
            .send({item})
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done)
    });
});

describe('DELETE /admin/bill-included', () => {
    it('should delete a bill included item', (done) => {
        var id = billIncludeds[0]._id.toHexString();
        var item = 'First item';
        request(app)
            .delete(`/admin/bill-included/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.item).toBe(item);
            })
            .end(done)
    })
})



