# Copyright (C) 2016 Google Inc., authors, and contributors
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>


"""Renames is_declining_review property

Revision ID: 8e530ce276a
Revises: 321f1d702be0
Create Date: 2015-03-03 16:43:22.942740

"""

# revision identifiers, used by Alembic.
revision = '8e530ce276a'
down_revision = '321f1d702be0'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        'cycle_task_entries', 'is_declining_review', new_column_name='_is_declining_review',
        type_=sa.Boolean())
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        'cycle_task_entries', '_is_declining_review', new_column_name='is_declining_review',
        type_=sa.Boolean())
    ### end Alembic commands ###
