<?php
/**
 * Add or Edit Employer Form
 */
?>
<div class="row" id="team-form">
    <div class="form" data-model="team" data-type="form">
        <div class="col-md-7">
            <div class="panel general-information">
                <div class="panel-heading">
                    <h6>General Information</h6>
                </div>
                <div class="panel-body">
                    <input type="hidden" name="team_id"/>

                    <div class="input-group form-group">
                        <span class="input-group-addon">Team Name:</span>
                        <input type="text" class="form-control" name="team_name" placeholder="Awesome Team"/>
                    </div>
                    <div class="form-group team-employers">
                        <input type="hidden" name="team_employers" id="team-employers" value=""/>


                        <div class="panel team-employers">
                            <div class="panel-heading">
                                <h6>Employees</h6>
                                <ul class="panel-actions">
                                    <li>
                                        <button data-action="remove-all-employers"><span title="Remove all">Remove all</span></button>
                                    </li>
                                </ul>
                            </div>
                            <div class="panel-body">
                                <ul class="team-members connected-sortable sortable-placeholder" id="team-sortable"></ul>
                            </div>
                        </div>
                    </div>
                    <h5>Team Information</h5>

                    <p class="hint">
                        Fill fields below in order to display headings before team showcase on your site.
                    </p>

                    <div class="input-group form-group">
                        <span class="input-group-addon">Team Title:</span>
                        <input type="text" class="form-control" name="team_title" placeholder="Team Members"/>
                    </div>
                    <div class="input-group form-group">
                        <span class="input-group-addon">Description:</span>
                        <textarea class="form-control" name="team_description" id="" cols="1" rows="4" placeholder="Tell something about your awesome team"></textarea>
                    </div>
                    <div class="alert" id="ajax-form-result"></div>
                </div>
            </div>
            <div class="panel live-preview">
                <div class="panel-heading">
                    <h6>Builder</h6>
                    <a class="btn btn-transparent" title="Help" data-action="modal" href="#modal-help">
                        <svg viewBox="0 0 36 36">
                            <use xlink:href="#icon-help" transform="translate(-5, -5)"></use>
                        </svg>
                    </a>
                </div>
                <div class="panel-body">
                    <div class="team-preview-wrapper">
                        <p class="hint">Notice: Builder is not for preview purposes. The appearance on your site may differs due to design rules of your theme. Always check the result on front-end after saving.</p>
                        <div id="team-preview" class="team-preview"></div>
                        <div id="team-tooltips" class="team-tooltips"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="employers-list"></div>
            <div class="panel-collapse-team" id="team_collapse">
                <div class="panel group-form panel-design" panel="group">
                    <div class="panel-heading">
                        <h6>Group settings</h6>
                        <ul class="panel-actions">
                            <li>
                                <svg viewBox="0 0 1024 1024" class="icon-triangle at-transition">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-thin-down"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body a-scroll a-scroll-row a-collapse">
                        <div class="padding-wrapper">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Order By:</span>
                                        <div class="display-table">
                                            <div class="display-table-cell">
                                                <select name="team_order_by">
                                                    <option value="title" selected>Alphabet</option>
                                                    <option value="publish_date">Publish Date</option>
                                                    <option value="custom">Custom Order</option>
                                                    <option value="random">Random</option>
                                                </select>
                                            </div>
                                            <div class="display-table-cell">
                                                <div class="btn-group order-direction btn-group-radio" data-field-name="order">
                                                    <label type="button" class="btn btn-default active order_direction_asc" data-option-name="direction" data-model-node="root">
                                                        <input type="radio"
                                                               style="display: none;"
                                                               name="team_order_direction"
                                                               class="option-text-transform"
                                                               checked
                                                               data-value="asc"/>
                                                        Asc
                                                    </label>
                                                    <label type="button" class="btn btn-default order_direction_desc" data-option-name="direction" data-model-node="root">
                                                        <input type="radio"
                                                               style="display: none;"
                                                               name="team_order_direction"
                                                               class="option-text-transform"
                                                               data-value="desc"/>
                                                        Desc
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel group-form panel-design" panel="panel">
                    <div class="panel-heading">
                        <h6>Panel settings</h6>
                        <ul class="panel-actions">
                            <li>
                                <svg viewBox="0 0 1024 1024" class="icon-triangle at-transition">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-thin-down"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body a-scroll a-scroll-row a-collapse">
                        <div class="padding-wrapper">
                            <div class="row">
                                <div class="col-md-6 panel">
                                    <p class="hint">
                                        Switch on panel option to see additional panel settings
                                    </p>

                                    <div class="input-group form-group">
                                        <span class="input-group-addon transparent">Enable</span>

                                        <div class="text-right">
                                            <label class="toggle" data-group="styles">
                                                <input type="hidden" name="team_styles_panel" data-checked="" checked>
                                                <span class="handle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-styling">
                                <h5>Panel settings</h5>
                                <div class="row">
                                    <div class="col-md-6 model-field filter">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Contacts</span>
                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_panel_contacts_visible" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 model-field filter">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Social bar</span>
                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_panel_social_visible" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 hover model-field">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon">Panel theme:</span>
                                            <select name="team_styles_panel_theme">
                                                <option value="empty_white" selected>Empty White</option>
                                                <option value="empty_dark" selected>Empty Dark</option>
                                                <option value="clean">Clean</option>
                                                <option value="modern">Modern</option>
                                                <option value="full_photo_dark">Full Photo Dark</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 panel_color model-field">
                                        <div class="input-group bootstrap-colorpicker form-group">
                                            <span class="input-group-addon">Accent color:</span>
                                            <span class="input-group-addon color"><i></i></span>
                                            <input type="text" name="team_styles_panel_color" value="" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 hover model-field">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon">Panel animation:</span>
                                            <select name="team_styles_panel_animation">
                                                <option value="push" selected>Push content</option>
                                                <option value="over" selected>Slide over</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel team-form panel-design" panel="design">
                    <div class="panel-heading a-collapse-head-open">
                        <h6>Design customization</h6>
                        <ul class="panel-actions">
                            <li>
                                <svg viewBox="0 0 1024 1024" class="icon-triangle at-transition">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-chevron-thin-down"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body a-scroll a-scroll-row">
                        <div class="padding-wrapper">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Layout:</span>
                                        <select name="team_layout">
                                            <option value="grid" selected>Grid</option>
                                            <option value="table">Table</option>
                                            <option value="widget">Widget</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Template:</span>
                                        <select name="team_template"></select>
                                    </div>
                                </div>
                            </div>

                            <div class="interface-elements">
                                <h5>Interface elements</h5>
                                <div class="row">
                                    <div class="col-md-6 model-field filter">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Filters</span>
                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_filter" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 model-field search">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Search</span>
                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_search" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 model-field slider">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Slider</span>
                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_slider" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="slider-options">
                                <h5>Slider options</h5>

                                <div class="row">
                                    <div class="col-md-6 model-field slider_autoplay">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Autoplay</span>

                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_slider_autoplay" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 slider_autoplay_speed model-field">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon">Speed (in ms):</span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                name="team_styles_slider_autoplay_speed"
                                                placeholder="In milliseconds"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 model-field slider_adaptive">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon transparent">Adaptive height</span>

                                            <div class="text-right">
                                                <label class="toggle" data-group="styles">
                                                    <input type="hidden" name="team_styles_slider_adaptive" data-checked="" checked>
                                                    <span class="handle"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="interface-styling">
                                <h5>Interface styling</h5>
                                <p class="hint">Applies to slider buttons, filters and so on.</p>
                                <div class="row">
                                    <div class="col-md-6 button_color model-field">
                                        <div class="input-group bootstrap-colorpicker form-group">
                                            <span class="input-group-addon">Button BG:</span>
                                            <span class="input-group-addon color"><i></i></span>
                                            <input type="text" name="team_styles_button_color" value="" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 button_hover_color model-field">
                                        <div class="input-group bootstrap-colorpicker form-group">
                                            <span class="input-group-addon">... On hover:</span>
                                            <span class="input-group-addon color"><i></i></span>
                                            <input type="text" name="team_styles_button_hover_color" value="" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 button_text_color model-field">
                                        <div class="input-group bootstrap-colorpicker form-group">
                                            <span class="input-group-addon">Button label:</span>
                                            <span class="input-group-addon color"><i></i></span>
                                            <input type="text" name="team_styles_button_text_color" value="" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 button_text_hover_color model-field">
                                        <div class="input-group bootstrap-colorpicker form-group">
                                            <span class="input-group-addon">... On hover:</span>
                                            <span class="input-group-addon color"><i></i></span>
                                            <input type="text" name="team_styles_button_text_hover_color" value="" class="form-control"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group form-group">
                                            <span class="input-group-addon">Filter font:</span>
                                            <div class="display-table">
                                                <div class="display-table-cell filter_font_size model-field">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name="team_styles_filter_font_size"
                                                        placeholder="14px"/>
                                                </div>
                                                <div class="display-table-cell">
                                                    <div class="btn-group filter_font_style font-style btn-group-checkbox" data-field-name="filter">
                                                        <label type="button" class="btn btn-default filter_bold btn-bold model-field" data-option-name="bold">
                                                            <input type="hidden"
                                                                   style="display: none;"
                                                                   class="option-bold"
                                                                   name="team_styles_filter_bold"
                                                                   value=""
                                                                   checked
                                                                   data-value=""
                                                                   data-checked="" />
                                                            <strong>B</strong>
                                                        </label>
                                                        <label type="button" class="btn btn-default filter_italic btn-italic model-field" data-option-name="italic">
                                                            <input type="hidden"
                                                                   style="display: none;"
                                                                   name="team_styles_filter_italic"
                                                                   class="option-italic"
                                                                   value=""
                                                                   checked
                                                                   data-value=""
                                                                   data-checked=""/>
                                                            <em>I</em>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="display-table-cell">
                                                    <div class="btn-group filter_text_transform btn-group-text-transform btn-group-radio model-field" data-field-name="filter">
                                                        <label type="button" class="btn btn-default active filter_text_transform_none" data-option-name="text_transform">
                                                            <input type="radio"
                                                                   style="display: none;"
                                                                   name="team_styles_filter_text_transform"
                                                                   class="option-text-transform"
                                                                   checked
                                                                   data-value="none" />
                                                            Aa
                                                        </label>
                                                        <label type="button" class="btn btn-default filter_text_transform_uppercase" data-option-name="text_transform">
                                                            <input type="radio"
                                                                   style="display: none;"
                                                                   name="team_styles_filter_text_transform"
                                                                   class="option-text-transform"
                                                                   data-value="uppercase"/>
                                                            AA
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5 class="effects-label">Effects</h5>
                            <div class="row">
                                <div class="col-md-6 reveal model-field">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon transparent">Revealing</span>
                                        <div class="text-right">
                                            <label class="toggle" data-group="styles">
                                                <input type="hidden" name="team_styles_reveal" data-checked="" checked>
                                                <span class="handle"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6 hover model-field">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Hover:</span>
                                        <select name="team_styles_hover">
                                            <option value="off" selected>Off</option>
                                            <option value="apollo">Apollo</option>
                                            <option value="jazz">Jazz</option>
                                            <option value="hera">Hera</option>
                                            <option value="phoebe">Phoebe</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <h5 class="layout-label">Layout settings</h5>
                            <div class="row">
                                <div class="col-md-6 card_width model-field">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Cards in row:</span>
                                        <select name="team_styles_card_width">
                                            <option value="1" selected>1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6 gaps model-field">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Gaps:</span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="team_styles_gaps"
                                            placeholder="In pixels"/>
                                    </div>
                                </div>
                                <div class="col-md-6 align model-field">
                                    <div class="input-group form-group">
                                        <span class="input-group-addon">Align:</span>

                                        <div class="btn-group btn-group-justified team-align">
                                            <label type="button" class="btn btn-default active align-left">
                                                <input type="radio" style="display: none;" name="team_styles_align" checked data-value="left"/>
                                                <svg viewBox="0 0 36 36">
                                                    <use xlink:href="#icon-align-left" transform="translate(10, 0)"></use>
                                                </svg>
                                            </label>
                                            <label type="button" class="btn btn-default align-center">
                                                <input type="radio" style="display: none;" name="team_styles_align" data-value="center"/>
                                                <svg viewBox="0 0 36 36">
                                                    <use xlink:href="#icon-align-center" transform="translate(-40, 0)"></use>
                                                </svg>
                                            </label>
                                            <label type="button" class="btn btn-default align-right">
                                                <input type="radio" style="display: none;" name="team_styles_align" data-value="right"/>
                                                <svg viewBox="0 0 36 36">
                                                    <use xlink:href="#icon-align-right" transform="translate(-90, 0)"></use>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h5 class="card-label">Card settings</h5>
                            <div class="row">
                                <div class="col-md-6 card_gaps model-field">
                                    <div class="input-group form-">
                                        <span class="input-group-addon">Inner gaps:</span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name="team_styles_card_gaps"
                                            placeholder="In pixels"/>
                                    </div>
                                </div>
                                <div class="col-md-6 card_base_color model-field">
                                    <div class="input-group bootstrap-colorpicker form-group">
                                        <span class="input-group-addon">Background:</span>
                                        <span class="input-group-addon color"><i></i></span>
                                        <input type="text" name="team_styles_card_base_color" value="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-6 card_border_color model-field">
                                    <div class="input-group bootstrap-colorpicker form-group">
                                        <span class="input-group-addon">Border:</span>
                                        <span class="input-group-addon color"><i></i></span>
                                        <input type="text" name="team_styles_card_border_color" value="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-6 card_shadow_color model-field">
                                    <div class="input-group bootstrap-colorpicker form-group">
                                        <span class="input-group-addon">Shadow:</span>
                                        <span class="input-group-addon color"><i></i></span>
                                        <input type="text" name="team_styles_card_shadow_color" value="" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-md-6 card_even_row_color model-field">
                                    <div class="input-group bootstrap-colorpicker form-group">
                                        <span class="input-group-addon">Even row BG:</span>
                                        <span class="input-group-addon color"><i></i></span>
                                        <input type="text" name="team_styles_card_even_row_color" value="" class="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <h5>Block visibility</h5>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row team-blocks-visibility">
                                        <div class="col-md-6 body_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Body:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_body_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 photo_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Photo:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_photo_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 name_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Name:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_name_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 divider_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Divider:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_divider_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 position_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Occupation:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_position_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 short_bio_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Biography:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_short_bio_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 email_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Email:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_email_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 phone_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Phone:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_phone_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 skype_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Skype:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_skype_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 link_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Website:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_link_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 location_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Location:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_location_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 social_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Social:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_social_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 skills_visible visible">
                                            <div class="input-group form-group">
                                                <span class="input-group-addon transparent">Skills:</span>
                                                <div class="text-right">
                                                    <label class="toggle" data-group="styles">
                                                        <input type="hidden" name="team_styles_skills_visible" data-checked="" checked>
                                                        <span class="handle"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="team_blocks_order" value="">
                                </div>
                            </div>
                            <h5>Custom CSS</h5>
                            <div class="row">
                                <div class="col-md-12">
                                    <textarea name="team_custom_css" id="" cols="30" rows="10" class="form-control" placeholder="Put your custom CSS here"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

