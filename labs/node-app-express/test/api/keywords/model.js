const mongoose = require('mongoose');
const config = require('config');
const chai = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Keyword = require('../../../api/keywords/model');
const expect = chai.expect;
const assert = chai.assert;
chai.should();

describe('api/keywords/model', () => {
    const mongoServer = new MongoMemoryServer();
    const { options } = config.get('database');
    
    before(async () => {
        const uri = await mongoServer.getConnectionString();
        console.log('MONGODB_URI', uri);
        await mongoose.connect(uri, options);
    });

    after(async() => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await Keyword.deleteMany();
    });

    it('should create a keyword', async () => {
        const newKeyword = {
            name: 'fake-name',
            desc: 'fake-desc',
            url: 'fake-url',
        };
        const persistedKeyword = await Keyword.create(newKeyword);
        expect(persistedKeyword).to.have.property('_id');
        expect(persistedKeyword).to.have.property('__v');
        expect(persistedKeyword).to.have.property('name')
            .to.equal(newKeyword.name);
        expect(persistedKeyword).to.have.property('desc')
            .to.equal(newKeyword.desc);
        expect(persistedKeyword).to.have.property('url')
            .to.equal(newKeyword.url);

        const count = await Keyword.countDocuments();
        expect(count).to.equal(1);
    });

    it('should throw an error if no name', async () => {
        let hasError = false;
        try {
            await Keyword.create({
                desc: 'fake-desc',
                url: 'fake-url'
            });
        } catch (error) {
            hasError = true;
            expect(error.name).to.equal('ValidationError');
            expect(error.errors).to.have.property('name');
        }
        expect(hasError, 'ValidationError must be thrown').to.be.true;
    });
});