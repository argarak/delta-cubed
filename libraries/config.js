/*
  Copyright (c) Jakub Kukiełka

  This file is part of delta-cubed.

  Delta-cubed is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  Delta-cubed is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with delta-cubed.  If not, see <http://www.gnu.org/licenses/>.
*/

requirejs.config({
    baseUrl: "/delta-cubed/libraries/",
    paths: {
        text: 'plugins/text', //text is required
	json: 'plugins/json' //alias to plugin
    }
});
