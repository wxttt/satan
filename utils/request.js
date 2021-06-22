exports.wrapRes = (data, code, msg) => ({
  code,
  msg: msg || 'success',
  data,
});

exports.wrapPagingRes = (data, code, msg, totalCount, page, totalPages) => ({
  code,
  msg: msg || 'success',
  data,
});
