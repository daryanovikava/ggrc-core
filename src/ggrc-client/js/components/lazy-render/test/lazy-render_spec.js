/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import {getComponentVM} from '../../../../js_specs/spec_helpers';
import Component from '../lazy-render';

describe('lazy-render component', function () {
  'use strict';

  let viewModel;

  beforeEach(function () {
    viewModel = getComponentVM(Component);
  });

  it('should render content only once when the trigger is truthy', function () {
    viewModel.attr('trigger', true);
    expect(viewModel.attr('activatedOrForceRender')).toBe(true);
    viewModel.attr('trigger', false);
    expect(viewModel.attr('activatedOrForceRender')).toBe(true);
  });

  it('should re-render content when the trigger is truthy and '+
     'forceClearContent is set',
  function () {
    viewModel.attr('trigger', true);
    // content is rendered
    expect(viewModel.attr('activatedOrForceRender')).toBe(true);

    viewModel.attr('forceClearContent', true);
    // content cleared
    expect(viewModel.attr('activatedOrForceRender')).toBe(false);

    viewModel.attr('forceClearContent', false);
    // content rendered again
    expect(viewModel.attr('activatedOrForceRender')).toBe(true);
  });
});
