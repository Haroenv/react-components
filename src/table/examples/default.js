class Example extends React.Component {

  render() {
    const columns = [{
      key: 'name',
      label: 'Name'
    }, {
      key: 'age',
      label: 'Age'
    }, {
      key: 'occupation',
      label: 'Occupation'
    }];

    const data = [{
      name: 'gabro',
      age: 26,
      occupation: 'Software Engineer'
    }, {
      name: 'franci',
      age: 24,
      occupation: 'Component Engineer'
    }, {
      name: 'daniele',
      age: 26,
      occupation: 'CFO'
    }];

    const rowGetter = index => data[index];

    const rowsCount = data.length;

    const columnsTemplate = columns => ({ columnWidth, ...columnProps } = {}) => columns.map(({ key, label, fixed, width }) => {
      const props = {
        width: width || columnWidth,
        key,
        dataKey: key,
        fixed,
        label,
        ...columnProps
      };
      return <Column {...props} />;
    });

    const cellRenderer = (cellData, selected, cellDataKey, rowData) => {
      const columnData = rowData[cellDataKey];
      const isFirstCell = cellDataKey === 'name';
      const props = {
        hAlignContent: isFirstCell ? 'left' : 'center',
        vAlignContent: 'center',
        height: '100%',
        style: isFirstCell ? { paddingLeft: 10 } : undefined
      };
      return <FlexView {...props}>{columnData}</FlexView>;
    };

    const headerRenderer = label => (
      <FlexView hAlignContent='center' vAlignContent='center' height='100%' style={{ padding: '0 5px' }}>
        <strong>{label}</strong>
      </FlexView>
    );

    const rowHeight = 44;

    const onRowSelect = row => alert(`Selected row ${row}`);

    return (
      <FlexView style={{ height: (rowsCount + 1) * rowHeight, width: '100%' }}>
        <Table
          autoSize={true}
          autoSizeColumns={true}
          rowHeight={rowHeight}
          rowGetter={rowGetter}
          rowsCount={rowsCount}
          cellRenderer={cellRenderer}
          headerHeight={rowHeight}
          selectionType='single'
          onRowSelect={onRowSelect}
        >
          {columnsTemplate(columns)({ headerRenderer })}
        </Table>
      </FlexView>
    );
  }
}
