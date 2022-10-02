/* istanbul ignore file */
const UT_URL = 'http://foo.com/tests';
const UT_AUTH = `Basic Zm9vOmJhcg==`;
const UT_QS = 'cities=Houston';

const UT_RETURN_OK_VALUE = [
  {
    id: 123,
    name: 'test',
  },
];

const UT_501_VALUE = {
  status: 501,
  data: null,
};

const UT_200_VALUE = {
  status: 200,
  data: UT_RETURN_OK_VALUE,
};

module.exports = {
  UT_URL,
  UT_AUTH,
  UT_QS,
  UT_501_VALUE,
  UT_200_VALUE,
  UT_RETURN_OK_VALUE,
}
