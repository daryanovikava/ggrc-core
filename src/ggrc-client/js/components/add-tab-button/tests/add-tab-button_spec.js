/*
  Copyright (C) 2019 Google Inc.
  Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import {getComponentVM} from '../../../../js_specs/spec_helpers';
import Component from '../add-tab-button';
import Permission from '../../../permission';

describe('add-tab-button component', function () {
  'use strict';

  let viewModel;

  beforeEach(function () {
    viewModel = getComponentVM(Component);
    viewModel.attr('instance', new can.Map());
  });

  describe('isAuditInaccessibleAssessment attribute get() method', function () {
    describe('returns false', () => {
      it('if instance type is not Assessment', () => {
        viewModel.attr('instance.type', 'Type');

        let result = viewModel.attr('isAuditInaccessibleAssessment');

        expect(result).toBe(false);
      });

      it('if instance type is Assessment but there is no audit', () => {
        viewModel.attr('instance', {
          type: 'Assessment',
          audit: null,
        });

        let result = viewModel.attr('isAuditInaccessibleAssessment');

        expect(result).toBe(false);
      });

      it(`if instance type is Assessment, there is audit and
        it is allowed to read instance.audit`, () => {
        viewModel.attr('instance', {
          type: 'Assessment',
          audit: {},
        });
        spyOn(Permission, 'is_allowed_for').and.returnValue(true);

        let result = viewModel.attr('isAuditInaccessibleAssessment');

        expect(result).toBe(false);
      });
    });

    describe('returns true', () => {
      it(`if instance type is Assessment, there is audit but
        it is not allowed to read instance.audit`, () => {
        spyOn(Permission, 'is_allowed_for').and.returnValue(false);
        viewModel.attr('instance', {
          type: 'Assessment',
          audit: {},
        });
        viewModel.attr('isAuditInaccessibleAssessment', false);

        let result = viewModel.attr('isAuditInaccessibleAssessment');

        expect(result).toBe(true);
      });
    });
  });

  describe('sortWidgets() method', () => {
    it('sorts widget names in alphabetical order', () => {
      const list = ['Policies', 'Audits', 'Contracts', 'Risks'];

      viewModel.attr('widgetList',
        list.map((name) => ({internav_display: name})));

      viewModel.sortWidgets();

      const result = viewModel.attr('widgetList')
        .map((widget) => widget.internav_display).serialize();

      expect(result).toEqual(list.sort());
    });
  });
});
