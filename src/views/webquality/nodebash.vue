<template>
  <div class="app-container">
    <div class="documentation-container">
      <div class="inlineset">
        <div style="padding-top: 7px">输入待测试的页面:</div>
        <el-input
          class="URL-input"
          v-model="input"
          :placeholder="placeholder"
          @keyup.enter="search()"
          :disabled="disabledsearch"
        ></el-input>
        <el-button
          type="primary"
          class="search-button"
          @click="search()"
          :disabled="disabledsearch"
          >执行测试</el-button
        >
        <el-button
          type="primary"
          class="search-button"
          @click="check()"
          :disabled="disabledsearch"
          >历史查询</el-button
        >
      </div>
      <div class="highsettingnet">
        <el-switch v-model="value1" inactive-text="切换网络"></el-switch>
        <el-select
          v-model="value"
          class="selecthigh"
          placeholder="请选择网络"
          :disabled="!value1"
          clearable
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="highsetting">
        <el-switch
          style="display: block"
          v-model="value2"
          inactive-text="插入动态脚本"
        ></el-switch>
      </div>
      <div v-bind:class="{ uploadfile: !value2 }">
        <el-upload
          class="upload-demo"
          drag
          multiple
          action="http://10.23.84.23:5389/upload"
          :on-success="uploadsuccess"
          :on-error="uploaderror"
          :before-upload="beforeupload"
          :file-list="fileList"
          :limit="1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="tableshow">
      <el-tabs
        v-model="activeName"
        v-loading="loading"
        :element-loading-text="text"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="数据汇总" name="first">
          <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel-score">
                <div class="card-panel-description">
                  <div class="card-panel-text">Coach Overall Score</div>
                  <div class="card-panel-data">{{ this.info.score }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <el-tooltip
                content="点击可查看详细实践以及给出的建议"
                placement="top"
                effect="light"
                open-delay="500"
              >
                <div class="card-panel-score" @click="accessibilityscore()">
                  <div class="card-panel-description">
                    <div class="card-panel-text">Coach Accessibility Score</div>
                    <div class="card-panel-data">
                      {{ this.info.accessibilityscore }}
                    </div>
                  </div>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <el-tooltip
                content="点击可查看详细实践以及给出的建议"
                placement="top"
                effect="light"
                open-delay="500"
              >
                <div class="card-panel-score" @click="bestpracticescore()">
                  <div class="card-panel-description">
                    <div class="card-panel-text">Coach Best Practice Score</div>
                    <div class="card-panel-data">
                      {{ this.info.bestpracticescore }}
                    </div>
                  </div>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <el-tooltip
                content="点击可查看详细实践以及给出的建议"
                placement="top"
                effect="light"
                open-delay="500"
              >
                <div class="card-panel-score" @click="privacyscore()">
                  <div class="card-panel-description">
                    <div class="card-panel-text">Coach Privacy Score</div>
                    <div class="card-panel-data">
                      {{ this.info.privacyscore }}
                    </div>
                  </div>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <el-tooltip
                content="点击可查看详细实践以及给出的建议"
                placement="top"
                effect="light"
                open-delay="500"
              >
                <div class="card-panel-score" @click="performancescore()">
                  <div class="card-panel-description">
                    <div class="card-panel-text">Coach Performance Score</div>
                    <div class="card-panel-data">
                      {{ info.performancescore }}
                    </div>
                  </div>
                </div>
              </el-tooltip>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">First Paint</div>
                  <div class="card-panel-data">{{ info.firstPaint }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Fully Loaded</div>
                  <div class="card-panel-data">{{ info.fullyLoaded }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">pageLoadTime</div>
                  <div class="card-panel-data">{{ info.pageLoadTime }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">First Visual Change</div>
                  <div class="card-panel-data">{{ info.Fchange }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Last Visual Change</div>
                  <div class="card-panel-data">{{ info.Lchange }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Speed Index</div>
                  <div class="card-panel-data">{{ info.rumSpeedIndex }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Total Requests</div>
                  <div class="card-panel-data">{{ info.totalrequests }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Image Requests</div>
                  <div class="card-panel-data">{{ info.imgrequests }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">JavaScript Requests</div>
                  <div class="card-panel-data">{{ info.jsrequests }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">CSS Requests</div>
                  <div class="card-panel-data">{{ info.cssrequests }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Total Transfer Size</div>
                  <div class="card-panel-data">{{ info.totalSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">JavaScript Transfer Size</div>
                  <div class="card-panel-data">{{ info.jsSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Image Transfer Size</div>
                  <div class="card-panel-data">{{ info.imgSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">CSS Transfer Size</div>
                  <div class="card-panel-data">{{ info.cssSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">JavaScript Content Size</div>
                  <div class="card-panel-data">{{ info.jsconSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Third Party Transfer Size</div>
                  <div class="card-panel-data">{{ info.thirdsize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Third Party Requests</div>
                  <div class="card-panel-data">{{ info.thirdrequests }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">CSS Content Size</div>
                  <div class="card-panel-data">{{ info.cssconSize }}</div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-description">
                  <div class="card-panel-text">Image Content Size</div>
                  <div class="card-panel-data">{{ info.imgconSize }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="页面分析" name="third">
          <div class="tip">所分析数据平均值:</div>
          <el-table :data="pagesdata" style="width: 100%" border height="150">
            <el-table-column fixed label="URL" width="350">{{
              analyinput
            }}</el-table-column>
            <el-table-column
              prop="Fchange"
              label="布局开始时间(ms)"
              width="185"
            ></el-table-column>
            <el-table-column
              prop="Lchange"
              label="完成布局时间(ms)"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="totalSize"
              label="总传输的大小(kb)"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="totalrequests"
              label="总请求数"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="thirdrequests"
              label="第三方请求数"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="jsSize"
              label="JavaScript 传输大小(kb)"
              width="190"
            ></el-table-column>
            <el-table-column
              prop="cssSize"
              label="CSS 传输大小(kb)"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="imgSize"
              label="Image 传输大小(kb)"
              width="180"
            ></el-table-column>
          </el-table>
          <div class="tip">选择你需要查看的数据:</div>
          <div class="radio">
            <el-radio-group v-model="radio">
              <el-radio :label="1" @change="changeradio">第一次分析</el-radio>
              <!-- <el-radio :label="2" @change="changeradio">第二次分析</el-radio>
              <el-radio :label="3" @change="changeradio">第三次分析</el-radio> -->
            </el-radio-group>
          </div>
          <el-tabs v-model="activeNamepages" @tab-click="handleClickMetrics">
            <el-tab-pane label="瀑布流" name="pagefirst">
              <el-table :data="changepagedata" style="width: 100%">
                <el-table-column label="Waterfall">
                  <template slot-scope="scope">
                    <el-collapse v-model="activeNamewaterfull" accordion>
                      <el-collapse-item>
                        <div slot="title" class="header">
                          {{ scope.row.URl }}
                        </div>
                        <div class="urltitle">URL :{{ scope.row.URlt }}</div>
                        <el-tabs v-model="activeNamewaterfulllist" border>
                          <el-tab-pane label="Timings" name="onefirst">
                            <div class="subtitle">
                              总耗时 :{{ scope.row.totaltime }} ms
                            </div>
                            <div class="subtitle">
                              Blocked :{{ scope.row.timings.blocked }} ms
                            </div>
                            <div class="subtitle">
                              DNS :{{ scope.row.timings.dns }} ms
                            </div>
                            <div class="subtitle">
                              Connect :{{ scope.row.timings.connect }} ms
                            </div>
                            <div class="subtitle">
                              SSL (TLS) :{{ scope.row.timings.ssl }} ms
                            </div>
                            <div class="subtitle">
                              Send :{{ scope.row.timings.send }} ms
                            </div>
                            <div class="subtitle">
                              Wait :{{ scope.row.timings.wait }} ms
                            </div>
                            <div class="subtitle">
                              Receive :{{ scope.row.timings.receive }} ms
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="GeneralData" name="onesecond">
                            <div class="subtitle">
                              HTTP Version :{{
                                scope.row.RawData.response.httpVersion
                              }}
                            </div>
                            <div class="subtitle">
                              Method :{{ scope.row.RawData.request.method }}
                            </div>
                            <div class="subtitle">
                              Connection :{{ scope.row.RawData.connection }}
                            </div>
                            <div class="subtitle">
                              Server IPAddress :{{
                                scope.row.RawData.serverIPAddress
                              }}
                            </div>
                            <div class="subtitle">
                              Initiator (Loaded by) :{{
                                scope.row.RawData._initiator
                              }}
                            </div>
                            <div class="subtitle">
                              Browser Priority :{{
                                scope.row.RawData._priority
                              }}
                            </div>
                            <div class="subtitle">
                              Started :{{ scope.row.RawData.startedDateTime }} +
                              {{
                                new Date(
                                  scope.row.RawData.startedDateTime
                                ).getTime() - originaltimerun
                              }}
                              ms after page request started
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Request" name="onethird">
                            <div>
                              {{
                                JSON.stringify(
                                  scope.row.RawData.request,
                                  null,
                                  "\t"
                                )
                              }}
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="Response" name="oneforth">
                            <div>
                              {{
                                JSON.stringify(
                                  scope.row.RawData.response,
                                  null,
                                  "\t"
                                )
                              }}
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="RawData" name="onefifth">
                            <div>
                              {{
                                JSON.stringify(scope.row.RawData, null, "\t")
                              }}
                            </div>
                          </el-tab-pane>
                        </el-tabs>
                      </el-collapse-item>
                    </el-collapse>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Visual Metrics" name="pagesecond">
              <div class="tip">Visual Metrics</div>
              <el-row :gutter="40" class="panel-group">
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">FirstVisualChange</div>
                      <div class="card-panel-data">
                        {{ initdata.FirstVisualChange }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">onLoad</div>
                      <div class="card-panel-data">{{ initdata.onLoad }}ms</div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">onContentLoad</div>
                      <div class="card-panel-data">
                        {{ initdata.onContentLoad }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">firstContentfulPaint</div>
                      <div class="card-panel-data">
                        {{ initdata.firstContentfulPaint }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">largestContentfulPaint</div>
                      <div class="card-panel-data">
                        {{ initdata.largestContentfulPaint }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">LastVisualChange</div>
                      <div class="card-panel-data">
                        {{ initdata.LastVisualChange }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">VisualComplete85</div>
                      <div class="card-panel-data">
                        {{ initdata.VisualComplete85 }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">VisualComplete95</div>
                      <div class="card-panel-data">
                        {{ initdata.VisualComplete95 }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">VisualComplete99</div>
                      <div class="card-panel-data">
                        {{ initdata.VisualComplete99 }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div id="main" style="width: 1000px; height: 500px"></div>
              <div class="tip">Browser Metrics</div>
              <el-row :gutter="40" class="panel-group">
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">backEndTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.backEndTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">domContentLoadedTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.domContentLoadedTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">domInteractiveTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.domInteractiveTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">domainLookupTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.domainLookupTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">frontEndTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.frontEndTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">pageLoadTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.pageLoadTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">redirectionTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.redirectionTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">serverConnectionTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.serverConnectionTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">serverResponseTime</div>
                      <div class="card-panel-data">
                        {{ Browserinitdata.serverResponseTime }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">firstPaint</div>
                      <div class="card-panel-data">
                        {{ Browsertime.firstPaint }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">fullyLoaded</div>
                      <div class="card-panel-data">
                        {{ Browsertime.fullyLoaded }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel">
                    <div class="card-panel-description">
                      <div class="card-panel-text">rumSpeedIndex</div>
                      <div class="card-panel-data">
                        {{ Browsertime.rumSpeedIndex }}ms
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="PageXray" name="pagethird">
              <h2>PageXray</h2>
              <p>How the page is built.</p>
              <div class="tip">页面上较大的assets(by transfer size)</div>
              <el-table
                :data="assetschangepagedata"
                style="width: 100%"
                height="500"
              >
                <el-table-column
                  prop="url"
                  label="URL"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="type"
                  label="Type"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="transize"
                  label="Transfer Size"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="consize"
                  label="Content Size"
                  width="180"
                ></el-table-column>
              </el-table>
              <div class="tip">每个文本类型下的请求和大小</div>
              <el-table
                :data="assetscontentdata"
                style="width: 100%"
                height="350"
              >
                <el-table-column
                  prop="name"
                  label="Content"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="headerSize"
                  label="Header Size"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transferSize"
                  label="Transfer Size"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="contentSize"
                  label="Content Size"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="requests"
                  label="Requests"
                  width="120"
                ></el-table-column>
              </el-table>
              <div class="tip">在onLoad事件后加载的请求</div>
              <el-table
                :data="assetsonloaddata"
                style="width: 100%"
                height="350"
              >
                <el-table-column
                  prop="name"
                  label="Content"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="transferSize"
                  label="Transfer Size"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="requests"
                  label="Requests"
                  width="120"
                ></el-table-column>
              </el-table>
              <div class="tip">在onContentLoad后加载的请求</div>
              <el-table
                :data="assetsoncontentloaddata"
                style="width: 100%"
                height="350"
              >
                <el-table-column
                  prop="name"
                  label="Content"
                  width="300"
                ></el-table-column>
                <el-table-column
                  prop="transferSize"
                  label="Transfer Size"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="requests"
                  label="Requests"
                  width="120"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="Domains" name="fourth">
          <div class="tip">1 page analysed for {{ analyinput }}</div>
          <div class="tip">Domains - 分析</div>
          <el-table
            :data="videodomainData1"
            style="width: 100%"
            border
            height="450"
          >
            <el-table-column
              fixed
              prop="domain"
              label="Domain"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="blocked"
              label="Blocked(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="dns"
              label="DNS(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="connect"
              label="Connect(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="send"
              label="Send(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="wait"
              label="Wait(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="receive"
              label="Receive(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="transferSize"
              label="transferSize(kb)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Totaltime"
              label="Total time(ms)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Requests"
              label="Requests"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Speed"
              label="Speed (kb/s)"
              width="150"
            ></el-table-column>
          </el-table>
          <!-- <div class="tip">第二次分析Domains</div>
          <el-table
            :data="videodomainData2"
            style="width: 100%"
            border
            height="450"
          >
            <el-table-column
              fixed
              prop="domain"
              label="Domain"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="blocked"
              label="Blocked(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="dns"
              label="DNS(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="connect"
              label="Connect(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="send"
              label="Send(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="wait"
              label="Wait(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="receive"
              label="Receive(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="transferSize"
              label="transferSize(kb)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Totaltime"
              label="Total time(ms)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Requests"
              label="Requests"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Speed"
              label="Speed (kb/s)"
              width="150"
            ></el-table-column>
          </el-table>
          <div class="tip">第三次分析Domains</div>
          <el-table
            :data="videodomainData3"
            style="width: 100%"
            border
            height="450"
          >
            <el-table-column
              fixed
              prop="domain"
              label="Domain"
              width="300"
            ></el-table-column>
            <el-table-column
              prop="blocked"
              label="Blocked(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="dns"
              label="DNS(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="connect"
              label="Connect(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="send"
              label="Send(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="wait"
              label="Wait(ms)"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="receive"
              label="Receive(ms)"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="transferSize"
              label="transferSize(kb)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Totaltime"
              label="Total time(ms)"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Requests"
              label="Requests"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="Speed"
              label="Speed (kb/s)"
              width="150"
            ></el-table-column>
          </el-table> -->
        </el-tab-pane>
        <el-tab-pane label="TopLists" name="fifth">
          <div class="tip">1 page analysed for {{ analyinput }}</div>
          <el-tabs :tab-position="tabPosition" style="height: 450px">
            <el-tab-pane label="较大的js文件">
              <el-table :data="jsdata" style="width: 100%" border height="450">
                <el-table-column
                  fixed
                  prop="url"
                  label="请求的url"
                  width="500"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="最近一次修改时间"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="缓存时长"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transfer"
                  label="传输大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="size"
                  label="文件大小 (kb)"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="较大的图片文件">
              <el-table :data="imgdata" style="width: 100%" border height="450">
                <el-table-column
                  fixed
                  prop="url"
                  label="请求的url"
                  width="500"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="最近一次修改时间"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="缓存时长"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transfer"
                  label="传输大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="size"
                  label="文件大小 (kb)"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="较大的css文件">
              <el-table :data="cssdata" style="width: 100%" border height="450">
                <el-table-column
                  fixed
                  prop="url"
                  label="请求的url"
                  width="500"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="最近一次修改时间"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="缓存时长"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transfer"
                  label="传输大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="size"
                  label="文件大小 (kb)"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="较大的HTML文件">
              <el-table
                :data="htmldata"
                style="width: 100%"
                border
                height="450"
              >
                <el-table-column
                  fixed
                  prop="url"
                  label="请求的url"
                  width="500"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="最近一次修改时间"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="缓存时长"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transfer"
                  label="传输大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="size"
                  label="文件大小 (kb)"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="响应较慢的文件资源">
              <el-table
                :data="slowresdata"
                style="width: 100%"
                border
                height="450"
              >
                <el-table-column
                  fixed
                  prop="url"
                  label="请求的url"
                  width="500"
                ></el-table-column>
                <el-table-column
                  prop="date"
                  label="最近一次修改时间"
                  width="250"
                ></el-table-column>
                <el-table-column
                  prop="time"
                  label="缓存时长"
                  width="160"
                ></el-table-column>
                <el-table-column
                  prop="transfer"
                  label="传输大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="size"
                  label="文件大小 (kb)"
                  width="150"
                ></el-table-column>
                <el-table-column
                  prop="timing"
                  label="timing (ms)"
                  width="150"
                ></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="Asserts" name="sixth">
          <div class="tip">1 page analysed for {{ analyinput }}</div>
          <div class="tip">{{ Assertstitle }}</div>
          <el-table :data="Assertsdata" style="width: 100%" border height="500">
            <el-table-column
              fixed
              prop="url"
              label="请求的URL"
              width="500"
            ></el-table-column>
            <el-table-column
              prop="mimeType"
              label="文件类型"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="最近一次修改时间"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="time"
              label="缓存时长"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="size"
              label="文件大小 (kb)"
              width="120"
            ></el-table-column>
            <el-table-column prop="Requests" label="总请求数"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="Accessibility advice"
        :visible.sync="AccessibilityVisible"
      >
        <el-table :data="AccessibilityData" stripe style="width: 100%">
          <el-table-column
            prop="title"
            label="主题"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="advice"
            label="建议"
            width="400"
          ></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="Performance advice" :visible.sync="PerformanceVisible">
        <el-table :data="PerformanceData" stripe style="width: 100%">
          <el-table-column
            prop="title"
            label="主题"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="advice"
            label="建议"
            width="400"
          ></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog
        title="Best practice advice"
        :visible.sync="BestpracticeVisible"
      >
        <el-table :data="BestpracticeData" stripe style="width: 100%">
          <el-table-column
            prop="title"
            label="主题"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="advice"
            label="建议"
            width="400"
          ></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog title="Privacy advice" :visible.sync="PrivacyVisible">
        <el-table :data="PrivacyData" stripe style="width: 100%">
          <el-table-column
            prop="title"
            label="主题"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="advice"
            label="建议"
            width="400"
          ></el-table-column>
          <el-table-column prop="score" label="得分"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
// import moment from "moment";
import echarts from "echarts";
import componentsRouter from "../../router/modules/components";
export default {
  name: "nodebash",
  data() {
    return {
      pages: [],
      originaltimerun: "",
      fileList: [],
      placeholder: "请输入需要测试的URL",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      disabledsearch: false,
      value1: false,
      value2: false,
      options: [
        {
          value: "3g",
          label: "3g",
        },
        {
          value: "3gslow",
          label: "3gslow",
        },
        {
          value: "3gfast",
          label: "3gfast",
        },
      ],
      value: "",
      chart: null,
      pagexrayData: [],
      initdata: {},
      Browserinitdata: {},
      Browsertime: {},
      input: "",
      analyinput: "",
      radio: 1,
      tabPosition: "left",
      jsdata: [],
      imgdata: [],
      cssdata: [],
      htmldata: [],
      slowresdata: [],
      Assertsdata: [],
      videodomainData1: [],
      // videodomainData2: [],
      // videodomainData3: [],
      pagesdata: [],
      version: "",
      loading: false,
      entries: [],
      domain: "",
      Assertstitle: "",
      activeName: "first",
      activeNamepages: "pagefirst",
      activeNamewaterfull: "1",
      activeNamewaterfulllist: "onefirst",
      domainArr: [],
      info: {},
      AccessibilityVisible: false,
      PerformanceVisible: false,
      BestpracticeVisible: false,
      PrivacyVisible: false,
      webcoach: {},
      AccessibilityData: [],
      PerformanceData: [],
      BestpracticeData: [],
      PrivacyData: [],
      pageObj: {},
      changepagedata: [],
      VisualMetrics: {},
      charts: "",
      progress: [],
      timer: [],
      VisualProgressdata: {},
      assets: [],
      assetschangepagedata: [],
      assetscontentdata: [],
      assetsonloaddata: [],
      assetsoncontentloaddata: [],
      text: "正在执行自动化,请耐心等待~",
    };
  },

  mounted() {
    this.$nextTick(function () {
      this.drawPie("main");
    });
    this.getLocalstorage();
  },
  methods: {
    handleClick(tab) {
      if (tab.name === "fourth" && this.pagexrayData) {
        this.videodomainData1 = [];
        // this.videodomainData2 = [];
        // this.videodomainData3 = [];
        // 1
        for (let key in this.pagexrayData[0].domains) {
          const obj = {
            domain: key,
            blocked: this.pagexrayData[0].domains[key].timings.blocked,
            dns: this.pagexrayData[0].domains[key].timings.dns,
            connect: this.pagexrayData[0].domains[key].timings.connect,
            send: this.pagexrayData[0].domains[key].timings.send,
            wait: this.pagexrayData[0].domains[key].timings.wait,
            receive: this.pagexrayData[0].domains[key].timings.receive,
            transferSize: (
              this.pagexrayData[0].domains[key].transferSize / 1024
            ).toFixed(2),
            Totaltime: this.pagexrayData[0].domains[key].totalTime,
            Requests: this.pagexrayData[0].domains[key].requests,
            Speed: (
              (this.pagexrayData[0].domains[key].transferSize /
                1024 /
                this.pagexrayData[0].domains[key].totalTime) *
              1000
            ).toFixed(2),
          };
          this.videodomainData1.push(obj);
        }
        // 2
        // for (let key in this.pagexrayData[1].domains) {
        //   const obj = {
        //     domain: key,
        //     blocked: this.pagexrayData[1].domains[key].timings.blocked,
        //     dns: this.pagexrayData[1].domains[key].timings.dns,
        //     connect: this.pagexrayData[1].domains[key].timings.connect,
        //     send: this.pagexrayData[1].domains[key].timings.send,
        //     wait: this.pagexrayData[1].domains[key].timings.wait,
        //     receive: this.pagexrayData[1].domains[key].timings.receive,
        //     transferSize: (
        //       this.pagexrayData[1].domains[key].transferSize / 1024
        //     ).toFixed(2),
        //     Totaltime: this.pagexrayData[1].domains[key].totalTime,
        //     Requests: this.pagexrayData[1].domains[key].requests,
        //     Speed: (
        //       (this.pagexrayData[1].domains[key].transferSize /
        //         1024 /
        //         this.pagexrayData[1].domains[key].totalTime) *
        //       1000
        //     ).toFixed(2),
        //   };
        //   this.videodomainData2.push(obj);
        // }
        // 3
        // for (let key in this.pagexrayData[2].domains) {
        //   const obj = {
        //     domain: key,
        //     blocked: this.pagexrayData[2].domains[key].timings.blocked,
        //     dns: this.pagexrayData[2].domains[key].timings.dns,
        //     connect: this.pagexrayData[2].domains[key].timings.connect,
        //     send: this.pagexrayData[2].domains[key].timings.send,
        //     wait: this.pagexrayData[2].domains[key].timings.wait,
        //     receive: this.pagexrayData[2].domains[key].timings.receive,
        //     transferSize: (
        //       this.pagexrayData[2].domains[key].transferSize / 1024
        //     ).toFixed(2),
        //     Totaltime: this.pagexrayData[2].domains[key].totalTime,
        //     Requests: this.pagexrayData[2].domains[key].requests,
        //     Speed: (
        //       (this.pagexrayData[2].domains[key].transferSize /
        //         1024 /
        //         this.pagexrayData[2].domains[key].totalTime) *
        //       1000
        //     ).toFixed(2),
        //   };
        //   this.videodomainData3.push(obj);
        // }
      }
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.$notify.error({
        title: "注意",
        message: "还没有上传文件哦",
      });
    },
    beforeupload(file) {
      console.log("beforefile: ", file);
      console.log("beforefile.type: ", file.type);
      const isjs = file.type.indexOf("/javascript") > -1;
      console.log("beforeisjs ", isjs);
      if (!isjs) {
        this.$message.error("请上传js文件！");
      }
      return isjs;
    },
    uploadsuccess(response, file, fileList) {
      console.log("response: ", response);
      if (response.code === 404) {
        this.$message({
          showClose: true,
          message: response.msg,
          type: "error",
        });
        this.fileList = [];
      } else {
        this.$notify.success({
          title: "成功",
          message: "上传成功~",
        });
      }
      console.log("file: ", file);
      console.log("fileList: ", fileList);
    },
    uploaderror(err, file, fileList) {
      this.$notify.error({
        title: "错误",
        message: "文件上传失败！",
      });
      console.log("uploaderrorfile: ", file);
      console.log("uploaderrorfileList: ", fileList);
    },
    // get localStorage
    getLocalstorage() {
      try {
        var response = JSON.parse(localStorage.getItem("response"));
        var url = localStorage.getItem("url");
        this.analyinput = url;
        if (response) {
          this.placeholder = "当前测试url为：" + url;
          // this.Deach = response.Deach;
          this.jsdata = response.Toplist.javascript.slice(
            0,
            Math.round(response.Toplist.javascript.length / 2) + 1
          );
          this.cssdata = response.Toplist.css;
          this.htmldata = response.Toplist.html;
          this.imgdata = response.Toplist.img.slice(
            0,
            Math.round(response.Toplist.javascript.length / 2) + 1
          );
          this.slowresdata = response.Slowestresponses;
          this.Assertstitle =
            "Showing  " + response.Assertsdata.length + " assets of this test";
          this.Assertsdata = response.Assertsdata;
          this.pagesdata = response.pagesdata;
          this.info = response.infoData;
          this.webcoach = response.webcoach;
          this.pageObj = response.eachpage;
          this.changepagedata = response.eachpage.FpageData;
          this.originaltimerun = new Date(
            response.eachpage.FpageData[0].RawData.startedDateTime
          ).getTime();
          this.pagexrayData = response.pagexraydata;
          this.Browserinitdata = response.webcoach.advice.timings.timings;
          this.Browsertime = response.webcoach.advice.timings;
          this.assets = response.PageXrayasserts;
          this.pages = response.pages;
        } else {
          this.placeholder = "请输入需要测试的URL";
          console.log("no storage");
        }
      } catch (e) {
        this.$notify.error({
          title: "错误",
          message: "包含错误信息：",
          e,
        });
      }
    },
    search() {
      try {
        if (this.input === "") {
          this.$notify.error({
            title: "警告",
            message: "URL不可为空！",
          });
        } else if (this.input != "") {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
          if (!reg.test(this.input)) {
            this.$notify.error({
              title: "错误",
              message: "请输入正确的URL~",
            });
            this.input = "";
          } else {
            let newinput = this.input;
            let shortUrl = newinput.replace(/\?.*/, "");
            const obj = {
              url: "",
              option: "",
            };
            if (this.value1) {
              obj.url = shortUrl;
              obj.option = this.value;
            } else {
              obj.url = shortUrl;
            }
            this.loading = true;
            this.disabledsearch = true;
            this.value1 = false;
            this.$http
              .resoleautorun(obj)
              .then((res) => {
                if (res.msg === "success") {
                  this.loading = false;
                  this.$alert(
                    "自动化执行完成拉~ 点击下方按钮获取数据吧",
                    "获取数据",
                    {
                      confirmButtonText: "获取数据",
                      callback: (action) => {
                        this.loading = true;
                        this.disabledsearch = true;
                        this.value1 = false;
                        this.text = "正在获取数据，请稍等~";
                        this.$http
                          .getneedfile(obj)
                          .then((res) => {
                            if (res.msg === "success") {
                              this.analyinput = this.input;
                              this.disabledsearch = false;
                              this.value1 = false;
                              this.loading = false;
                              localStorage.setItem(
                                "response",
                                JSON.stringify(res)
                              );
                              localStorage.setItem("url", this.input);
                              // this.Deach = res.Deach;
                              this.jsdata = res.Toplist.javascript.slice(
                                0,
                                Math.round(res.Toplist.javascript.length / 2) +
                                  1
                              );
                              this.cssdata = res.Toplist.css;
                              this.htmldata = res.Toplist.html;
                              this.imgdata = res.Toplist.img.slice(
                                0,
                                Math.round(res.Toplist.javascript.length / 2) +
                                  1
                              );
                              this.slowresdata = res.Slowestresponses;
                              this.Assertstitle =
                                "Showing  " +
                                res.Assertsdata.length +
                                " assets of this test";
                              this.Assertsdata = res.Assertsdata;
                              this.pagesdata = res.pagesdata;
                              this.info = res.infoData;
                              this.webcoach = res.webcoach;
                              this.pageObj = res.eachpage;
                              this.changepagedata = res.eachpage.FpageData;
                              this.originaltimerun = new Date(
                                res.eachpage.FpageData[0].RawData.startedDateTime
                              ).getTime();
                              this.pagexrayData = res.pagexraydata;
                              this.Browserinitdata =
                                res.webcoach.advice.timings.timings;
                              this.Browsertime = res.webcoach.advice.timings;
                              this.assets = res.PageXrayasserts;
                              this.pages = res.pages;
                              this.input = "";
                            } else {
                              this.loading = false;
                              this.disabledsearch = false;
                              this.value1 = true;
                              this.input = "";
                              // this.$message.error(res.msg)
                              this.$message({
                                showClose: true,
                                message: res.msg,
                                type: "error",
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            this.disabledsearch = false;
                            this.value1 = true;
                            this.loading = false;
                            this.$message({
                              showClose: true,
                              message: "服务好像出问题了，请联系管理员",
                              type: "error",
                            });
                          });
                      },
                    }
                  );
                } else {
                  this.loading = false;
                  this.disabledsearch = false;
                  this.value1 = true;
                  // this.$message.error(res.msg)
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                this.disabledsearch = false;
                this.value1 = true;
                this.loading = false;
                this.$message({
                  showClose: true,
                  message: "服务好像出问题了，请联系管理员 then",
                  type: "error",
                });
              });
          }
        }
      } catch (e) {
        this.loading = false;
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员 try",
          type: "error",
        });
      }
    },
    // checkdata
    check() {
      try {
        if (this.input === "") {
          this.$notify.error({
            title: "警告",
            message: "URL不可为空！",
          });
        } else if (this.input != "") {
          var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
          if (!reg.test(this.input)) {
            this.$notify.error({
              title: "错误",
              message: "请输入正确的URL~",
            });
            this.input = "";
          } else {
            let newinput = this.input;
            let shortUrl = newinput.replace(/\?.*/, "");
            const obj = {
              url: shortUrl,
            };
            this.$http
              .checkdata(obj)
              .then((res) => {
                if (res.msg === "success") {
                  this.input = "";
                  this.$notify({
                    title: "成功",
                    message: "存在历史数据~",
                  });
                } else {
                  this.input = "";
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "error",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
                this.$message({
                  showClose: true,
                  message: "服务好像出问题了，请联系管理员",
                  type: "error",
                });
              });
          }
        }
      } catch (e) {
        console.log(e);
        this.$message({
          showClose: true,
          message: "服务好像出问题了，请联系管理员",
          type: "error",
        });
      }
    },
    // 数据切换
    handleClickMetrics(tab) {
      this.progress = [];
      this.timer = [];
      if (this.radio === 1 && tab.name === "pagesecond") {
        this.initdata = this.pages[0].pageTimings;
        this.VisualProgressdata = this.pagexrayData[0].visualMetrics.VisualProgress;
      }
      //  else if (this.radio === 2 && tab.name === "pagesecond") {
      //   this.initdata = this.pages[1].pageTimings;
      //   this.VisualProgressdata = this.pagexrayData[1].visualMetrics.VisualProgress;
      // } else {
      //   this.initdata = this.pages[2].pageTimings;
      //   this.VisualProgressdata = this.pagexrayData[2].visualMetrics.VisualProgress;
      // }

      if (tab.name === "pagesecond") {
        const newobj = this.VisualProgressdata;
        for (var r in newobj) {
          this.progress.push(parseInt(r)), this.timer.push(parseInt(newobj[r]));
        }
        this.drawPie("main");
      }

      if (this.radio === 1 && tab.name === "pagethird") {
        this.assetschangepagedata = this.assets[0];
        const contentTypes = this.pagexrayData[0].contentTypes;
        const arr = [];
        for (var i in contentTypes) {
          let consize;
          let transize;
          let headSize;
          consize = (contentTypes[i].contentSize / 1024).toFixed(2);
          transize = (contentTypes[i].transferSize / 1024).toFixed(2);
          headSize = (contentTypes[i].headerSize / 1024).toFixed(2);
          consize < 1024
            ? (consize = consize + " kb")
            : (consize = (consize / 1024).toFixed(2) + " m"),
            transize < 1024
              ? (transize = transize + " kb")
              : (transize = (transize / 1024).toFixed(2) + " m");
          headSize < 1024
            ? (headSize = headSize + " kb")
            : (headSize = (headSize / 1024).toFixed(2) + " m");
          const obj = {
            name: i,
            contentSize: consize,
            headerSize: headSize,
            transferSize: transize,
            requests: contentTypes[i].requests,
          };
          arr.push(obj);
        }
        this.assetscontentdata = arr;
        // OnLoad
        const OnLoadTypes = this.pagexrayData[0].afterOnLoad.contentTypes;
        const arrOnLoad = [];
        for (var i in OnLoadTypes) {
          let transizeOnLoad;
          transizeOnLoad = (OnLoadTypes[i].transferSize / 1024).toFixed(2);
          transizeOnLoad < 1024
            ? (transizeOnLoad = transizeOnLoad + " kb")
            : (transizeOnLoad = (transizeOnLoad / 1024).toFixed(2) + " m");
          const objo = {
            name: i,
            transferSize: transizeOnLoad,
            requests: OnLoadTypes[i].requests,
          };
          arrOnLoad.push(objo);
        }
        let totalsize = (
          this.pagexrayData[0].afterOnLoad.transferSize / 1024
        ).toFixed(2);
        totalsize < 1024
          ? (totalsize = totalsize + " kb")
          : (totalsize = (totalsize / 1024).toFixed(2) + " m");
        const toalobjo = {
          name: "Total",
          transferSize: totalsize,
          requests: this.pagexrayData[0].afterOnLoad.requests,
        };
        arrOnLoad.push(toalobjo);
        this.assetsonloaddata = arrOnLoad;
        // OncontentLoad
        const OncontentTypes = this.pagexrayData[0].afterOnContentLoad
          .contentTypes;
        const arrOncontent = [];
        for (var i in OncontentTypes) {
          let transizeOncontent;
          transizeOncontent = (OncontentTypes[i].transferSize / 1024).toFixed(
            2
          );
          transizeOncontent < 1024
            ? (transizeOncontent = transizeOncontent + " kb")
            : (transizeOncontent =
                (transizeOncontent / 1024).toFixed(2) + " m");
          const objc = {
            name: i,
            transferSize: transizeOncontent,
            requests: OncontentTypes[i].requests,
          };
          arrOncontent.push(objc);
        }
        let totalsizec = (
          this.pagexrayData[0].afterOnContentLoad.transferSize / 1024
        ).toFixed(2);
        totalsizec < 1024
          ? (totalsizec = totalsizec + " kb")
          : (totalsizec = (totalsizec / 1024).toFixed(2) + " m");
        const toalobjc = {
          name: "Total",
          transferSize: totalsizec,
          requests: this.pagexrayData[0].afterOnContentLoad.requests,
        };
        arrOncontent.push(toalobjc);
        this.assetsoncontentloaddata = arrOncontent;
      }
      //  else if (this.radio === 2 && tab.name === "pagethird") {
      //   this.assetschangepagedata = this.assets[1];
      //   const contentTypes = this.pagexrayData[1].contentTypes;
      //   const arr = [];
      //   for (var i in contentTypes) {
      //     let consize;
      //     let transize;
      //     let headSize;
      //     consize = (contentTypes[i].contentSize / 1024).toFixed(2);
      //     transize = (contentTypes[i].transferSize / 1024).toFixed(2);
      //     headSize = (contentTypes[i].headerSize / 1024).toFixed(2);
      //     consize < 1024
      //       ? (consize = consize + " kb")
      //       : (consize = (consize / 1024).toFixed(2) + " m"),
      //       transize < 1024
      //         ? (transize = transize + " kb")
      //         : (transize = (transize / 1024).toFixed(2) + " m");
      //     headSize < 1024
      //       ? (headSize = headSize + " kb")
      //       : (headSize = (headSize / 1024).toFixed(2) + " m");
      //     const obj = {
      //       name: i,
      //       contentSize: consize,
      //       headerSize: headSize,
      //       transferSize: transize,
      //       requests: contentTypes[i].requests,
      //     };
      //     arr.push(obj);
      //   }
      //   this.assetscontentdata = arr;
      //   // OnLoad
      //   const OnLoadTypes = this.pagexrayData[1].afterOnLoad.contentTypes;
      //   const arrOnLoad = [];
      //   for (var i in OnLoadTypes) {
      //     let transizeOnLoad;
      //     transizeOnLoad = (OnLoadTypes[i].transferSize / 1024).toFixed(2);
      //     transizeOnLoad < 1024
      //       ? (transizeOnLoad = transizeOnLoad + " kb")
      //       : (transizeOnLoad = (transizeOnLoad / 1024).toFixed(2) + " m");
      //     const objo = {
      //       name: i,
      //       transferSize: transizeOnLoad,
      //       requests: OnLoadTypes[i].requests,
      //     };
      //     arrOnLoad.push(objo);
      //   }
      //   let totalsize = (
      //     this.pagexrayData[1].afterOnLoad.transferSize / 1024
      //   ).toFixed(2);
      //   totalsize < 1024
      //     ? (totalsize = totalsize + " kb")
      //     : (totalsize = (totalsize / 1024).toFixed(2) + " m");
      //   const toalobjo = {
      //     name: "Total",
      //     transferSize: totalsize,
      //     requests: this.pagexrayData[1].afterOnLoad.requests,
      //   };
      //   arrOnLoad.push(toalobjo);
      //   this.assetsonloaddata = arrOnLoad;
      //   // OncontentLoad
      //   const OncontentTypes = this.pagexrayData[1].afterOnContentLoad
      //     .contentTypes;
      //   const arrOncontent = [];
      //   for (var i in OncontentTypes) {
      //     let transizeOncontent;
      //     transizeOncontent = (OncontentTypes[i].transferSize / 1024).toFixed(
      //       2
      //     );
      //     transizeOncontent < 1024
      //       ? (transizeOncontent = transizeOncontent + " kb")
      //       : (transizeOncontent =
      //           (transizeOncontent / 1024).toFixed(2) + " m");
      //     const objc = {
      //       name: i,
      //       transferSize: transizeOncontent,
      //       requests: OncontentTypes[i].requests,
      //     };
      //     arrOncontent.push(objc);
      //   }
      //   let totalsizec = (
      //     this.pagexrayData[1].afterOnContentLoad.transferSize / 1024
      //   ).toFixed(2);
      //   totalsizec < 1024
      //     ? (totalsizec = totalsizec + " kb")
      //     : (totalsizec = (totalsizec / 1024).toFixed(2) + " m");
      //   const toalobjc = {
      //     name: "Total",
      //     transferSize: totalsizec,
      //     requests: this.pagexrayData[1].afterOnContentLoad.requests,
      //   };
      //   arrOncontent.push(toalobjc);
      //   this.assetsoncontentloaddata = arrOncontent;
      // }
      else {
        this.assetschangepagedata = this.assets[2];
        const contentTypes = this.pagexrayData[2].contentTypes;
        const arr = [];
        for (var i in contentTypes) {
          let consize;
          let transize;
          let headSize;
          consize = (contentTypes[i].contentSize / 1024).toFixed(2);
          transize = (contentTypes[i].transferSize / 1024).toFixed(2);
          headSize = (contentTypes[i].headerSize / 1024).toFixed(2);
          consize < 1024
            ? (consize = consize + " kb")
            : (consize = (consize / 1024).toFixed(2) + " m"),
            transize < 1024
              ? (transize = transize + " kb")
              : (transize = (transize / 1024).toFixed(2) + " m");
          headSize < 1024
            ? (headSize = headSize + " kb")
            : (headSize = (headSize / 1024).toFixed(2) + " m");
          const obj = {
            name: i,
            contentSize: consize,
            headerSize: headSize,
            transferSize: transize,
            requests: contentTypes[i].requests,
          };
          arr.push(obj);
        }
        this.assetscontentdata = arr;
        // OnLoad
        const OnLoadTypes = this.pagexrayData[1].afterOnLoad.contentTypes;
        const arrOnLoad = [];
        for (var i in OnLoadTypes) {
          let transizeOnLoad;
          transizeOnLoad = (OnLoadTypes[i].transferSize / 1024).toFixed(2);
          transizeOnLoad < 1024
            ? (transizeOnLoad = transizeOnLoad + " kb")
            : (transizeOnLoad = (transizeOnLoad / 1024).toFixed(2) + " m");
          const objo = {
            name: i,
            transferSize: transizeOnLoad,
            requests: OnLoadTypes[i].requests,
          };
          arrOnLoad.push(objo);
        }
        let totalsize = (
          this.pagexrayData[1].afterOnLoad.transferSize / 1024
        ).toFixed(2);
        totalsize < 1024
          ? (totalsize = totalsize + " kb")
          : (totalsize = (totalsize / 1024).toFixed(2) + " m");
        const toalobjo = {
          name: "Total",
          transferSize: totalsize,
          requests: this.pagexrayData[1].afterOnLoad.requests,
        };
        arrOnLoad.push(toalobjo);
        this.assetsonloaddata = arrOnLoad;
        // OncontentLoad
        const OncontentTypes = this.pagexrayData[2].afterOnContentLoad
          .contentTypes;
        const arrOncontent = [];
        for (var i in OncontentTypes) {
          let transizeOncontent;
          transizeOncontent = (OncontentTypes[i].transferSize / 1024).toFixed(
            2
          );
          transizeOncontent < 1024
            ? (transizeOncontent = transizeOncontent + " kb")
            : (transizeOncontent =
                (transizeOncontent / 1024).toFixed(2) + " m");
          const objc = {
            name: i,
            transferSize: transizeOncontent,
            requests: OncontentTypes[i].requests,
          };
          arrOncontent.push(objc);
        }
        let totalsizec = (
          this.pagexrayData[2].afterOnContentLoad.transferSize / 1024
        ).toFixed(2);
        totalsizec < 1024
          ? (totalsizec = totalsizec + " kb")
          : (totalsizec = (totalsizec / 1024).toFixed(2) + " m");
        const toalobjc = {
          name: "Total",
          transferSize: totalsizec,
          requests: this.pagexrayData[2].afterOnContentLoad.requests,
        };
        arrOncontent.push(toalobjc);
        this.assetsoncontentloaddata = arrOncontent;
      }
    },
    changeradio() {
      if (this.radio === 1) {
        this.changepagedata = this.pageObj.FpageData;
        this.originaltimerun = new Date(
          this.pageObj.FpageData[0].RawData.startedDateTime
        ).getTime();
        this.activeNamepages = "pagefirst";
        // this.initdata = this.pagexrayData[0].visualMetrics
        // this.VisualProgressdata = this.pagexrayData[0].visualMetrics.VisualProgress
        // console.log(this.changepagedata + '111')
      }
      // else if (this.radio === 2) {
      //   // this.initdata = this.pagexrayData[1].visualMetrics
      //   this.changepagedata = this.pageObj.MpageData;
      //   this.originaltimerun = new Date(
      //     this.pageObj.MpageData[0].RawData.startedDateTime
      //   ).getTime();
      //   this.activeNamepages = "pagefirst";
      //   // this.VisualProgressdata = this.pagexrayData[1].visualMetrics.VisualProgress
      //   // console.log(this.changepagedata + '222')
      // } else {
      //   // this.initdata = this.pagexrayData[2].visualMetrics
      //   this.changepagedata = this.pageObj.LpageData;
      //   this.originaltimerun = new Date(
      //     this.pageObj.LpageData[0].RawData.startedDateTime
      //   ).getTime();
      //   this.activeNamepages = "pagefirst";
      //   // this.VisualProgressdata = this.pagexrayData[2].visualMetrics.VisualProgress
      //   // console.log(this.changepagedata + '333')
      // }
    },

    getSum() {
      const newarr = [];
      this.textarea.forEach((ele) => {
        if (ele.pageref === "page_1") {
          const obj = {
            url: ele.request.url,
            bodySize: ele.response.bodySize,
            _transferSize: ele.response._transferSize,
            redirectURL: ele.response.redirectURL,
            size: ele.response.content.size,
            _initiator: ele._initiator,
            _requestTime: ele._requestTime,
            mimeType: ele.response.content.mimeType,
          };
          newarr.push(obj);
        }
      });
      var sum = 0;
      var numt = 0;
      newarr.forEach((ele) => {
        sum++;
        // if (ele.mimeType.toLowerCase() === 'application/x-javascript') {
        numt = numt + ele.bodySize;
        // }
      });
      this.jstextarea = numt;
    },
    accessibilityscore() {
      const arr = [];
      const neewarr = [];
      var newobj = this.webcoach.advice.accessibility.adviceList;
      for (var k in newobj) {
        arr.push(newobj[k]);
      }
      arr.map((item) => {
        if (item.advice) {
          const obj = {
            advice: item.advice,
            title: item.title,
            score: item.score,
          };
          neewarr.push(obj);
        }
      });
      this.AccessibilityData = neewarr;
      this.AccessibilityVisible = true;
    },
    bestpracticescore() {
      const arr = [];
      const neewarr = [];
      var newobj = this.webcoach.advice.bestpractice.adviceList;
      for (var k in newobj) {
        arr.push(newobj[k]);
      }
      arr.map((item) => {
        if (item.advice) {
          const obj = {
            advice: item.advice,
            title: item.title,
            score: item.score,
          };
          neewarr.push(obj);
        }
      });
      this.BestpracticeData = neewarr;
      this.BestpracticeVisible = true;
    },
    privacyscore() {
      const arr = [];
      const neewarr = [];
      var newobj = this.webcoach.advice.privacy.adviceList;
      for (var k in newobj) {
        arr.push(newobj[k]);
      }
      arr.map((item) => {
        if (item.advice) {
          const obj = {
            advice: item.advice,
            title: item.title,
            score: item.score,
          };
          neewarr.push(obj);
        }
      });
      this.PrivacyData = neewarr;
      this.PrivacyVisible = true;
    },
    performancescore() {
      const arr = [];
      const neewarr = [];
      var newobj = this.webcoach.advice.performance.adviceList;
      for (var k in newobj) {
        arr.push(newobj[k]);
      }
      arr.map((item) => {
        if (item.advice) {
          const obj = {
            advice: item.advice,
            title: item.title,
            score: item.score,
          };
          neewarr.push(obj);
        }
      });
      this.PerformanceData = neewarr;
      this.PerformanceVisible = true;
    },
    drawPie(id) {
      // console.log(this)
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "Visual Metrics 折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Visual progress %"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timer,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Visual progress %",
            type: "line",
            stack: "总量",
            data: this.progress,
          },
        ],
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.uploadfile {
  display: none;
}

.inlineset {
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
}

.highsettingnet {
  margin-top: 8px;
  margin-bottom: 8px;
}

.highsetting {
  display: inline-block;
  margin-top: 8px;
  margin-bottom: 8px;
}

.selecthigh {
  margin-left: 10px;
}

.header {
  font-size: 18px;
  padding: 1em;
}

.urltitle {
  border-radius: 4px;
  line-height: 2;
  padding-left: 15px;
}
.subtitle {
  background-color: aliceblue;
  padding: 0 0 0.5em 0;
}
.tip {
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
  margin-bottom: 10px;
  margin-top: 10px;
}

.radio {
  margin-bottom: 10px;
  padding: 8px 16px;
}

.URL-input {
  margin-left: 5px;
  position: relative;
  width: 60%;
}

.chart-container {
  position: relative;
  width: 80%;
  height: calc(100vh - 84px);
}
.app-container {
  margin-left: 20px;
}
.documentation-container {
  margin: 50px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.search-button {
  margin-left: 10px;
  position: relative;
}
.tableshow {
  margin: 20px 30px;
}
.titlesize {
  font-size: 18px;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  background-color: #fdf6ec;
}

.TopListsnav {
  margin-bottom: 10px;
  font-size: 18px;
  width: 100%;
  padding: 8px 16px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  background-color: #fdf6ec;
}

.titlesizesub {
  font-size: 15px;
  width: 100%;
  padding: 8px 16px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  background-color: #fdf6ec;
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel-score {
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    color: #c09853;
    background-color: #fcf8e3;
    border-color: #fbeed5;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;

    &:hover {
      background-color: #f8f2d1;
      border-color: #faebce;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 8px;
      margin-left: 5px;

      .card-panel-text {
        line-height: 25px;
        font-size: 18px;
        margin-bottom: 12px;
      }
      .card-panel-data {
        font-size: 2rem;
        line-height: 1;
        font-weight: 700;
      }
      .summarysmall {
        font-size: 1rem;
        line-height: 1;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }

  .card-panel {
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    background-color: #d9edf7;
    border-color: #bce8f1;
    color: #3a87ad;
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;

    &:hover {
      background-color: #c2e2f1;
      border-color: #b0e5f0;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 8px;
      margin-left: 5px;

      .card-panel-text {
        line-height: 25px;
        font-size: 18px;
        margin-bottom: 12px;
      }
      .card-panel-data {
        font-size: 2rem;
        line-height: 1;
        font-weight: 700;
      }
      .summarysmall {
        font-size: 1rem;
        line-height: 1;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
