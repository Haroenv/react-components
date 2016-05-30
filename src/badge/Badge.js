import React from 'react';
import cx from 'classnames';
import { pure, skinnable, props, t } from '../utils';
import FlexView from '../flex/FlexView';

@pure
@skinnable()
@props({
  label: t.ReactChildren,
  active: t.maybe(t.Boolean),
  className: t.maybe(t.String),
  style: t.maybe(t.Object)
})
export default class Badge extends React.Component {

  getLocals() {
    const { label, active, className, style } =  this.props;

    return {
      label,
      style,
      className: cx('badge', { active }, className)
    };
  }

  template({ label, className, style }) {
    return (
      <FlexView vAlignContent='center' hAlignContent='center' {...{ className, style }}>
        <span className='badge-label'>{label}</span>
      </FlexView>
    );
  }
}
