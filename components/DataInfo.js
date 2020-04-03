export const DataInfo = ({skip, items_per_page, totalCount}) => {
  const STYLE = {
    paddingLeft: '15px',
    color: 'slategrey',
    fontFamily: 'monospace',
    fontSize: '13px',
  };
  return (
      <div style={STYLE}>
        <div>- Skip items: {skip}</div>
        <div>- Items per page: {items_per_page}</div>
        <div>- Query total count: {totalCount}</div>
      </div>
  )
};
