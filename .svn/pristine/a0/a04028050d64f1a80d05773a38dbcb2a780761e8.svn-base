<template>
	<view class='container'>
		<view class="info flex_r_s">
			<view class="title">类型</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.type==4&&'保养')||(detail.type==5&&'润滑')||''}}</view>
			</view>
		</view>
		<view v-if="detail.process" class="info flex_r_b">
			<view class="title ">流程说明</view>
			<view class='title-content-input'>
				{{detail.process}}
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">优先级</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">{{(detail.priority==0&&'正常')||(detail.priority==1&&'重要')||(detail.priority==2&&'紧急重要')}}</view>
			</view>
		</view>
		<view class="info flex_c_s_s">
			<view class="flex_r_s" style="margin-top: 55rpx;margin-bottom: 55rpx;">
				<view class="title">检查周期</view>
				<view class="title-content flex_r_e">
					<view class="chose-content">{{(detail.isCycle&&'周期性')||'临时性'}}</view>
				</view>
			</view>
			<view v-if="detail.isCycle" class="flex_r_s" style="margin:41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">周期单位</view>
				<view class='cycle'>
					<view class='flex_c_c' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="min-width: 50rpx;text-align: center; color: #626262;">{{detail.unit}}</view>
					</view>
				</view>
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 106rpx;">周期次数</view>
				<view class='cycle'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view style="width: 50rpx;text-align: right; color: #626262;">{{detail.num}}</view>
						<view style="margin-right: 10rpx;">次</view>
					</view>
				</view>
			</view>
			<view v-if="detail.isCycle" v-for="(item,index) in detail.time" :key='index' class="flex_r_s" style="margin:0rpx 0rpx 41rpx 0rpx;">
				<view style="font-size: 28rpx;color: #626262;margin:0rpx 16rpx 0rpx 31rpx;">开始时间</view>
				<view class='date'>
					<view class='flex_r_b' style="min-width:101rpx ;height: 60rpx;font-size: 27rpx;">
						<view class='flex_r_b' style="width: 340rpx;text-align: center; color: #626262;">
							<view style="margin-left: 20rpx;">{{item.date}}</view>
							<view style="margin-right: 20rpx;">{{item.time}}</view>
						</view>
						<image style="width: 20rpx;height: 12rpx;margin-right: 10rpx;" src="../../static/check/down_arrow.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">下发人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.createdUserName}}</view>
			</view>
		</view>
		<view class="info flex_c_c">
			<view class="flex_r_b" style="width: 100%;">
				<view class="title ">执行时效</view>
				<view style="margin-right: 38rpx;color:#626262;font-size: 28rpx;">{{detail['aging']}}小时</view>
			</view>
		</view>
		<view class="info flex_r_s">
			<view class="title ">执行人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.executor}}</view>
			</view>
		</view>
		<view v-if="detail.assist" class="info flex_r_s">
			<view class="title ">协助人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.assist}}</view>
			</view>
		</view>
		<view v-if="detail.cc" class="info flex_r_s">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view class='line1' style="text-align: right; width: 400rpx; color: #626262;">{{detail.cc}}</view>
			</view>
		</view>
		<view v-if="detail.desc" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">问题描述</view>
			<!-- style="width: 683rpx;height: 100%; background-color: #F2F2F2;" -->
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.desc}}
				</view>
			</view>
		</view>
		<!-- 图片/视频/音频 选择 -->
		<view v-if="detail.image[0]||detail.video||detail.voice" class="info flex_c_s_s">
			<view class="title" style="margin: 65rpx 0 39rpx 31rpx ">附件</view>
			<view class="upload flex_r_a">
				<view v-for="(item,index) in detail.image" :key='index' class='upload-img' @click="previewImage(index)">
					<image class='page_img' :src="IMAGE_URL+'/'+item||'../../static/check/img_default.png'" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="detail.image[0]" style="margin: 31rpx 0 31rpx 50rpx;color: #626262; font-size: 27rpx;"></view>
			<!-- 视频/音频 -->
			<view class="upload flex_r_b">
				<view v-if="detail.video" class='upload-video flex_c_c' @click="toWebView(detail.video)">
					<image class='video' src="../../static/video.png" mode="aspectFit"></image>
					<!-- <image v-if="!detail.video" style="width:100%;height:150rpx;" src="../../static/check/video.png" mode="aspectFill"></image> -->
					<!-- <video class='video' :src="IMAGE_URL+'/'+ detail.video" controls @error='videoError'></video> -->
					<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频详细描述异常</view>
				</view>
				<view v-if="detail.voice" class='upload-video flex_c_c' @click="playVoice(detail.voice)">
					<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
					<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
				</view>
			</view>
		</view>
		<view class="info flex_c_s">
			<view class="flex_r_b" style="width: 100%;margin: 80rpx 0 35rpx;">
				<view class="title ">{{detail.type==4?'保养项目':'润滑项目'}}</view>
			</view>
			<!-- 点检或巡检项目 -->
			<view v-for="(item,index) in detail.components" :key="index" style="width: 100%;">
				<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
					<view style="margin-left: 31rpx;font-size: 27rpx;color: #626262;">系统名称: {{item.systemName}}</view>
					<view src="" mode="aspectFit" style=" margin:41rpx 38rpx 41rpx 0;width: 40rpx;height:40rpx;"></view>
				</view>
				<view v-for="(itm,idx) in item.device" :key="idx">
					<view class="flex_r_b" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="margin:41rpx 38rpx 41rpx 50rpx;font-size: 27rpx;color: #626262;">设备名称: {{itm.parentName}}</view>
					</view>
					<!-- 子设备遍历 -->
					<view v-for="(itm1,idx1) in itm.child" :key='idx1' class="flex_c_s" style="width: 100%;border-bottom: 1rpx solid #E5E5E5;">
						<view style="width: 600rpx; margin:41rpx 0;font-size: 27rpx;color: #626262;" @click="toDetail(itm1.id)">
							({{idx1+1}}) {{detail.type==4?'保养项目':'润滑项目'}}: {{itm1.name}} <text style="color: #007AFF;" @click.stop="showChildDetail(itm1.taskComponentId)">{{(showChild[itm1.taskComponentId]?'(点击展开)':'(点击收起)')||''}}</text>
						</view>
						<!-- 是否收缩 -->
						<view v-if="!showChild[itm1.taskComponentId]">
							<!-- 选择检查情况 -->
							<view class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">{{detail.type==4?'保养情况':'润滑情况'}}</view>
								<!-- 只有未完成且执行人才能操作 -->
								<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_c_s_s" style="width: 420rpx;">
									<view class="flex_r_s_s">
										<view class='flex_r_s' @click="checkEvent(itm1.taskComponentId,0)">
											<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==0?'../../static/check/select.png':'../../static/check/unselect.png'"
											 mode="aspectFill"></image>
											<view :class="[checkInfo[itm1.taskComponentId]==0?'font-color':'un-font-color']" class="chose-content">完成</view>
										</view>
										<view class='flex_r_s' style="margin-left: 100rpx;" @click="checkEvent(itm1.taskComponentId,1)">
											<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==1?'../../static/check/select.png':'../../static/check/unselect.png'"
											 mode="aspectFill"></image>
											<view :class="[checkInfo[itm1.taskComponentId]==1?'font-color':'un-font-color']" class="chose-content">未完成</view>
										</view>
									</view>
									<view class='flex_r_s' style="margin-top: 40rpx;" @click="checkEvent(itm1.taskComponentId,2)">
										<image class='chose-icon' :src="checkInfo[itm1.taskComponentId]==2?'../../static/check/select.png':'../../static/check/unselect.png'"
										 mode="aspectFill"></image>
										<view :class="[checkInfo[itm1.taskComponentId]==2?'font-color':'un-font-color']" class="chose-content">无法执行</view>
									</view>
								</view>
								<!-- 只读情况 -->
								<view v-else class="flex_c_s_s" style="width: 420rpx;">
									<view class="flex_r_s_s">
										<view class='flex_r_s'>
											<image v-if="detail.taskInfo.isDone||itm1.info.isDone" class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
											<view v-if="detail.taskInfo.isDone||itm1.info.isDone" class="chose-content font-color">{{(itm1.info.result==0&&'完成')||(itm1.info.result==1&&'未完成')||(itm1.info.result==2&&'无法执行')}}</view>
											<view v-else class="chose-content" style="color: #5786F7;">正在进行中</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 无法执行原因 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor&&checkInfo[itm1.taskComponentId]==2" class="flex_c_s_s"
							 style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="flex_c_c" style="width: 100%;height: 150rpx;">
									<textarea style="width: 100%;height: 100%;" @input="reasonInput(itm1.taskComponentId,$event)" placeholder="请描述原因"
									 value="" />
									</textarea>
								</view>
							</view>
							<!-- 原因只读 -->
							<view v-else-if="itm1.info.result==2&&itm1.info.reason" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="flex_c_c" style="width: 100%;height: 150rpx;">
									<view style="width: 100%;height: 100%;">
										{{itm1.info.reason}}
									</view>
								</view>
							</view>
							<!-- 加油量 -->
							<view v-if="detail.type==5&&!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_r_b" style="width: 600rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">加油量</view>
								<view class="flex_r_s">
									<input type="digit" value="" @input="fuelInput(itm1.taskComponentId,$event)" placeholder="请输入加油量" style="width: 400rpx;text-align: right;color: #626262;" />
									<view>kg</view>
								</view>
							</view>
							<!-- 加油量只读 -->
							<view v-else-if="detail.type==5&&itm1.info.actual" class="flex_r_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">加油量</view>
								<view style="color: #626262;">{{itm1.info.actual||""}} kg</view>
							</view>
							<!-- <view v-if="detail.type==5" class="flex_r_s_s" style="width: 600rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">润滑类型</view>
								<view class="flex_c_s_s" style="width: 420rpx;">
									<view class="flex_r_s_s">
										<view class='flex_r_s'>
											<image class='chose-icon' src="../../static/check/select.png" mode="aspectFill"></image>
											<view class="chose-content" style="color: #5786F7;">{{(itm1.childType==0&&'补加')||(itm1.childType==1&&'更换')||''}}</view>
										</view>
									</view>
								</view>
							</view> -->
							<!-- 润滑备注-->
							<view v-if="detail.type==5&&!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="flex_c_c" style="width: 100%;height: 150rpx;">
									<textarea style="width: 100%;height: 100%;" @input="psInput(itm1.taskComponentId,$event)" placeholder="请填写润滑备注"
									 value="" />
									</textarea>
								</view>
							</view>
							<!-- 润滑备注-->
							<view v-else-if="detail.type==5&&itm1.ps" class="flex_c_s_s" style="background-color: #F2F2F2; font-size: 27rpx; width: 600rpx; color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="flex_c_c" style="width: 100%;height: 150rpx;">
									<view style="width: 100%;height: 100%;">
										{{itm1.ps||''}}
									</view>
								</view>
							</view>
							<!-- 如果未完成，是执行人 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" @click="userChose(itm1.taskComponentId)" class='flex_r_b'
							 style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">协助人</view>
								<view class="title-content  flex_r_e">
									<view style="color: #626262;">{{userChoseInfo[itm1.taskComponentId]||'请选择'}}</view>
									<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
								</view>
							</view>
							<!-- 只读 -->
							<view v-else-if="itm1.info.assist" class='flex_r_b' style="width: 600rpx;color: #626262; font-size: 27rpx;margin: 30rpx 0 35rpx;">
								<view class="title" style="margin-left: 0;color:#000000">协助人</view>
								<view class="title-content  flex_r_e">
									<view style="color: #626262;">{{itm1.info.assist}}</view>
								</view>
							</view>
							<view v-if="(!detail.taskInfo.isDone&&detail.taskInfo.isExecutor)||itm1.info.image[0]||itm1.info.video||itm1.info.voice "
							 class="flex_r_s" style="width: 600rpx;margin: 0rpx 0 35rpx;">
								<view class="title" style="margin-left: 0rpx;">附件</view>
							</view>
							<!-- 子设备图片/视频选择 -->
							<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="flex_r_b" style="width: 600rpx;">
								<view v-for="(itm2,idx2) in imgList[itm1.taskComponentId]||defaultImgList" :key='idx2' class='child-upload-img'>
									<image @click="chooseImg(itm1.taskComponentId,idx2)" class='page_img' :src="itm2||'../../static/check/img_default.png'"
									 mode="aspectFill"></image>
									<image v-if="itm2" @click.stop="deleteImg(itm1.taskComponentId,idx2)" class='delete' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
							</view>
							<!-- 子设备图片信息只读 -->
							<view v-else class="flex_r_a" style="width: 600rpx;">
								<view v-for="(itm2,idx2) in itm1.info.image" :key='idx2' class='child-upload-img' @click="previewImage1(index,idx,idx1,idx2)">
									<image class='page_img' :src="IMAGE_URL+'/'+itm2" mode="aspectFill"></image>
								</view>
							</view>
							<view v-if="(!detail.taskInfo.isDone&&detail.taskInfo.isExecutor)||itm1.info.image[0]" style="width: 600rpx;text-align: left; margin: 31rpx 0;color: #626262; font-size: 27rpx;">添加图片详细描述(可传4张)</view>
							<!-- 视频/音频 -->
							<view class="flex_r_b" style="width: 600rpx;">
								<!-- 视频编辑 -->
								<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class='child-upload-video flex_c_s' @click="chooseVideo(itm1.taskComponentId)">
									<image v-if="!video[itm1.taskComponentId]" style="width:100%;height:150rpx;" src="../../static/check/video.png"
									 mode="aspectFill"></image>
									<video class='child-video' v-if="video[itm1.taskComponentId]" :src="video[itm1.taskComponentId]" controls loop></video>
									<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">添加视频详细描述异常</view>
									<image v-if="video[itm1.taskComponentId]" @click.stop="deleteVideo(itm1.taskComponentId)" class='delete1' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
								<!-- 视频只读 -->
								<view v-else-if="itm1.info.video" class='child-upload-video flex_c_c' @click="toWebView(itm1.info.video)">
									<image class='child-video' src="../../static/video.png" mode="aspectFit"></image>
									<!-- <image style="width:100%;height:150rpx;" src="../../static/check/video.png" mode="aspectFill"></image> -->
									<!-- <video class='child-video' :src="IMAGE_URL+'/'+itm1.info.video" controls></video> -->
									<view style="color: #626262; font-size: 27rpx; margin-top: 31rpx;">视频详细描述异常</view>
								</view>
								<!-- 音频编辑 -->
								<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" @click="chooseAudio(itm1.taskComponentId)"
								 class='child-upload-video flex_c_s'>
									<image style="width:100%;height:150rpx;" :src="voice[itm1.taskComponentId]?'../../static/voice.png':'../../static/check/audio.png'"
									 mode="aspectFill"></image>
									<view v-if="!voice[itm1.taskComponentId]&&!isRecording" style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">
										点击录制语音(15s以内)
									</view>
									<view v-else-if="!voice[itm1.taskComponentId]&&isRecording" style="color: red; font-size: 27rpx;margin-top: 31rpx;">
										录音中({{count}} s),点击停止
									</view>
									<view v-else style="color: red; font-size: 27rpx;margin-top: 31rpx;">
										录音完成({{voice[itm1.taskComponentId].voiceTime}} s) 点击播放/暂停
									</view>
									<image v-if="voice[itm1.taskComponentId]" @click.stop="deleteVoice(itm1.taskComponentId)" class='delete1' src="../../static/check/delete.png"
									 mode="aspectFill"></image>
								</view>
								<!-- 音频只读 -->
								<view v-else-if="itm1.info.voice" class='child-upload-video flex_c_c' @click="playVoice(itm1.info.voice)">
									<image style="width:100%;height:150rpx;" src="../../static/voice.png" mode="aspectFill"></image>
									<view style="color: #626262; font-size: 27rpx;margin-top: 31rpx;">点击播放/暂停</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 修改抄送人 -->
		<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="info flex_r_s" @click="userChose('assistUpdate')">
			<view class="title ">抄送人</view>
			<view class="title-content flex_r_e">
				<view style="color: #626262;">{{userChoseInfo['assistUpdate']||'请选择'}}</view>
				<image style="margin-left: 26rpx; width: 13rpx;height: 25rpx;" src="../../static/index/right.png" mode="aspectFill"></image>
			</view>
		</view>
		<!-- 执行备注 -->
		<view v-if="!detail.taskInfo.isDone&&detail.taskInfo.isExecutor" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<textarea class='question-content-input' @input="executeInput" placeholder="请输入内容" value="" />
				</textarea>
			</view>
		</view>
		<!-- 执行备注只读 -->
		<view v-else-if="detail.excutePs" class="info flex_c_s_s">
			<view class="title" style="margin: 71rpx 0 39rpx 31rpx ">执行备注</view>
			<view class="question-content flex_c_c">
				<view class='question-content-input'>
					{{detail.excutePs}}
				</view>
			</view>
		</view>
		<view v-if="detail.taskInfo&&detail.taskInfo.isRevoke" class="info flex_r_s">
			<view class="title ">任务状态</view>
			<view class="title-content flex_r_e">
				<view class="chose-content">已撤销</view>
			</view>
		</view>
		<view class="flex_r_c" style="margin: 54rpx 0 250rpx;">
			<!-- 如果是执行人或者是创建人 -->
			<view v-if="detail.isCycle>0&&detail.taskInfo&&detail.taskInfo.isCreatedUser" class="btn" @click="toUpdate">去修改</view>
			<!-- 执行人提交 -->
			<view v-if="(detail.taskInfo&&!detail.taskInfo.isDone)&&detail.taskInfo.isExecutor" class="btn" @click="submit">提交</view>
			<!-- 是否展示撤销 -->
			<view v-if="detail.taskInfo&&detail.taskInfo.isCreatedUser&&!detail.taskInfo.isDone" class="btn" @click="revoke">
				撤销
			</view>
			<!-- 是否暂停 -->
			<view v-if="detail.isCycle>0&&(detail.taskInfo&&detail.taskInfo.isCreatedUser)" class="btn" @click="stop(detail.isPause)">{{detail.isPause==0?'暂停':'取消暂停'}}</view>
			<!-- 是否删除 -->
			<view v-if="detail.taskInfo&&detail.taskInfo.isCreatedUser&&!detail.taskInfo.isDone" class="btn" @click="del">删除</view>
		</view>
		<!-- <modal ref="modal">
			<video :src="videoUrl" controls></video>
		</modal> -->
	</view>
</template>

<script>
	import request from '../../util/request'
	import util from '../../util/util'
	import {
		DEBUG,
		SERVER_URL,
		IMAGE_URL,
		OFFLINE_KEY
	} from '../../util/config.js'
	let app = getApp()
	let taskId = ''
	let uid = ''
	let isCreate = ''
	let self
	const recorderManager = uni.getRecorderManager();
	// 选择的人员完整信息
	let choseInfo = {}
	// 原因信息
	let reason = {}
	const innerAudioContext = uni.createInnerAudioContext();
	// 子设备id
	let childDeviceId = ''
	let timer
	// 离线数据
	let offData
	// 加油量备注
	let ps = {}
	// 加油量内容
	let fuel = {}
	// 执行备注
	let excutePs = ''
	// 抄送人是否必须
	let ccIsMust = 0
	export default {
		data() {
			return {
				defaultImgList: ['', '', '', ''],
				imgList: {},
				video: {},
				voice: {},
				detail: {
					image: [],
					components: [],
					taskInfo: {}
				},
				checkInfo: {},
				userChoseInfo: {}, //当前页面各类别人员选择信息
				key: '', //协助人/执行人/抄送人/审批人
				SERVER_URL,
				IMAGE_URL,
				isRecording: 0,
				count: 0,
				showChild: {},
				videoUrl: ''
			}
		},
		onLoad(params) {
			self = this
			ccIsMust = 0
			offData = ''
			excutePs = ''
			choseInfo = {}
			// 原因信息
			reason = {}
			ps = {}
			// 加油量内容
			fuel = {}
			taskId = params.id
			uid = params.uid
			isCreate = params.isCreate
			let isMaintain = params.isMaintain
			if (isMaintain != 1) {
				uni.setNavigationBarTitle({
					title: '润滑'
				})
			}
			// 录音结束监听
			recorderManager.onStop(function(res) {
				DEBUG && console.log('录音临时路径' + res.tempFilePath);
				if (timer) {
					clearInterval(timer)
				}
				self.isRecording = 0
				self.voice[childDeviceId] = {
					url: res.tempFilePath
				}
				innerAudioContext.src = res.tempFilePath
				setTimeout(function() {
					self.count = innerAudioContext.duration
					// console.log(innerAudioContext.duration, self.count);
					self.voice[childDeviceId].voiceTime = innerAudioContext.duration
					self.voice = JSON.parse(JSON.stringify(self.voice))
				}, 200);
			});
			offData = JSON.parse(JSON.stringify(app.globalData.offlineInfo))
			app.globalData.offlineInfo = null
			// 如果有离线数据
			if (offData) {
				DEBUG && console.log('有离线数据', offData);
				if (offData.imgList) {
					this.imgList = offData.imgList
				}
				if (offData.voice) {
					this.voice = offData.voice
				}
				if (offData.video) {
					this.video = offData.video
				}
				reason = offData.reason || ''
				this.checkInfo = offData.checkInfo
				choseInfo = offData.choseInfo
				this.userChoseInfo = offData.userChoseInfo
			}
			this.getTaskDetail()
		},
		onUnload() {
			if (innerAudioContext.src) {
				// 已经暂停
				if (!innerAudioContext.paused) {
					// 暂停
					innerAudioContext.pause();
				}
			}
			// 清空选择数据
			app.globalData.userChoseInfo = {}
		},
		onShow() {
			console.log('全局选择', app.globalData.userChoseInfo);
			// 当前选择的人员类型
			if (app.globalData.userChoseInfo[this.key]) {
				choseInfo[this.key] = app.globalData.userChoseInfo[this.key].choseInfo || {}
				if (Object.values(choseInfo[this.key]).length > 0) {
					this.userChoseInfo[this.key] = Object.values(choseInfo[this.key]).map(item => {
						return item.username
					}).join('、')
				} else {
					this.userChoseInfo[this.key] = ''
				}
				this.userChoseInfo = JSON.parse(JSON.stringify(this.userChoseInfo))
				console.log('选择数据', choseInfo);
			}
		},
		// 到底了
		onReachBottom() {

		},
		// 分享
		// #ifdef MP-WEIXIN
		onShareAppMessage() {},
		// #endif
		// 页面滚动
		onPageScroll() {

		},
		methods: {
			toWebView(url) {
				util.navigate('/pages/video_play/video_play', {
					url
				})
			},
			// 去修改
			toUpdate() {
				app.globalData.detailInfo = this.detail
				this.detail.components.forEach((item, index) => {
					item.device.forEach(itm => {
						app.globalData.deviceInfo[item.system] = {
							system: item.system,
							systemName: item.systemName,
							device: {
								[itm.parent]: itm
							}
						}
					})

				})
				util.navigate('/pages/maintain/maintain', {
					isMaintain: this.detail.type = 4 ? 1 : ''
				})
			},
			// 暂停/继续任务
			async stop(id) {
				let url = id == 0 ? request.USER.PAUSE_TASK : request.USER.CONTINUE_TASK
				let res = await request.post(url, {
					taskId
				})
				DEBUG && console.log('暂停或取消暂停任务返回', res.data)
				if (res.data.statusCode == 200) {
					util.goBack()
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 删除任务
			del() {
				util.showModal('确定要永久删除当前任务？', async () => {
					let res = await request.post(request.USER.DEL_TASK, {
						taskId
					})
					DEBUG && console.log('删除任务返回', res.data)
					if (res.data.statusCode == 200) {
						util.goBack()
					} else {
						util.showModal(res.data.errmsg)
					}
				}, true)
			},
			// 部件详情
			toDetail(id) {
				DEBUG && console.log('项目id', id);
				app.globalData.isPoint = this.detail.type
				util.navigate('/pages/element_detail/element_detail', {
					componentId: id
				})
			},
			// 执行备注
			executeInput(e) {
				excutePs = e.detail.value || ''
			},
			videoError(e) {
				// console.log('视频播放错误', e);
			},
			playVideo(url) {
				let videoUrl = IMAGE_URL + '/' + url
				this.videoUrl = videoUrl
				this.$refs.modal.open()
			},
			// 是否显示子设备详细详细
			showChildDetail(id) {
				this.showChild[id] = !this.showChild[id]
				this.showChild = JSON.parse(JSON.stringify(this.showChild))
			},
			// 播放语音
			playVoice(src) {
				let url = IMAGE_URL + '/' + src
				if (innerAudioContext.src == url) {
					// 已经暂停
					if (innerAudioContext.paused) {
						DEBUG && console.log('播放');
						// 播放
						innerAudioContext.play();
					} else {
						DEBUG && console.log('暂停');
						// 暂停
						innerAudioContext.pause();
					}
				} else {
					innerAudioContext.src = url
					innerAudioContext.play();
				}
			},
			// 加油量内容
			fuelInput(key, e) {
				fuel[key] = e.detail.value || ''
			},
			// 无法执行原因描述
			reasonInput(key, e) {
				reason[key] = e.detail.value
			},
			// 加油量备注
			psInput(key, e) {
				ps[key] = e.detail.value
			},
			// 撤销任务
			async revoke() {
				let res = await request.post(request.USER.END_TASK, {
					taskId
				})
				DEBUG && console.log('撤销任务返回', res.data)
				if (res.data.statusCode == 200) {
					util.goBack()
				} else {
					util.showModal(res.data.errmsg)
				}
			},
			// 人员选择
			userChose(type) {
				util.navigate('/pages/user_choose/user_choose', {
					type
				})
				this.key = type
			},
			// 删除视频
			deleteVideo(id) {
				this.video[id] = ''
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 删除音频
			deleteVoice(id) {
				delete this.voice[id]
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 子设备检查情况
			checkEvent(id, idx) {
				if (this.checkInfo[id] != idx) {
					this.checkInfo[id] = idx
					if (idx != 2) {
						reason[id] = ''
					}
					self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
				}
			},
			// 获取任务/审批列表
			async getTaskDetail() {
				let reqData =  {
					taskId,
					uid
				}
				if(isCreate){
					reqData.isCreate = isCreate
				}
				let res = await request.get(request.USER.TASK_DETAIL,reqData)
				DEBUG && console.log('任务详情', res.data);
				if (res.data.statusCode == 200) {
					let temp = res.data.detail
					// console.log(IMAGE_URL + '/' + res.data.detail.video);
					if (!offData || (offData && Object.keys(offData.checkInfo).length == 0)) {
						for (let i = 0; i < temp.components.length; i++) {
							let device = temp.components[i].device
							for (let j = 0; j < device.length; j++) {
								let child = device[j].child
								child.forEach(item => {
									this.showChild[item.taskComponentId] = 1
									self.checkInfo[item.taskComponentId] = 0
								})
							}
						}
					}
					console.log(this.showChild);
					this.detail = res.data.detail
				} else {
					util.showModal(res.data.errmsg, () => {
						util.goBack()
					})
				}
			},
			// 预览图片
			previewImage1(idx1, idx2, idx3, idx4) {
				// console.log(this.detail.components[idx1].device[idx2].child[idx3].info.image);
				let list = this.detail.components[idx1].device[idx2].child[idx3].info.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				// console.log('展示图片列表', list);
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx4
				});
			},
			// 预览图片
			previewImage(idx) {
				let list = this.detail.image.map(item => {
					return IMAGE_URL + '/' + item
				})
				uni.previewImage({
					urls: list,
					loop: true,
					current: idx
				});
			},
			// 图片选择
			chooseImg(id, idx) {
				if (this.imgList[id] && this.imgList[id][idx]) {
					uni.previewImage({
						urls: this.imgList[id],
						loop: true,
						current: idx
					});
					return
				}
				uni.chooseImage({
					count: 4,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						let temp = res.tempFilePaths
						let length = 4 - temp.length
						if (temp.length > 3) {
							self.imgList[id] = temp.slice(0, 4)
						} else {
							for (let i = 0; i < length; i++) {
								temp.push('')
							}
							self.imgList[id] = temp
						}
						self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
					}
				})
			},
			// 删除图片
			deleteImg(id, idx) {
				this.imgList[id][idx] = ''
				self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
			},
			// 选择视频
			chooseVideo(id) {
				if (!this.video[id]) {
					uni.chooseVideo({
						count: 1,
						maxDuration: 15,
						sourceType: ['camera', 'album'],
						success: function(res) {
							console.log('视频文件', res.tempFilePath);
							self.video[id] = res.tempFilePath;
							self.detail.components = JSON.parse(JSON.stringify(self.detail.components))
						}
					});
				}
			},
			// 录音
			chooseAudio(id) {
				let src = this.voice[id] && this.voice[id].url
				if (src && innerAudioContext.src == src) {
					// 已经暂停
					if (innerAudioContext.paused) {
						// 播放
						innerAudioContext.play();
					} else {
						// 暂停
						innerAudioContext.pause();
					}
				} else if (src && innerAudioContext.src != src) {
					innerAudioContext.src = src
					innerAudioContext.play();
				} else if (!src) {
					// 如果当前正在录音则停止
					if (this.isRecording) {
						recorderManager.stop()
					} else {
						childDeviceId = id
						DEBUG && console.log('开始录音');
						self.count = 0
						// 最长15秒
						recorderManager.start({
							duration: 15000
						});
						// 录制中
						this.isRecording = 1
						timer = setInterval(() => {
							if (self.count < 15) {
								self.count += 1
							} else {
								clearInterval(timer)
							}
						}, 1000)
					}
				}
			},
			// 提交
			submit() {
				console.log(123, choseInfo['assistUpdate']);
				if (this.isRecording) {
					util.showModal('录音中不能提交')
					return
				}
				ccIsMust = Object.values(this.checkInfo).some(item => {
					return item > 0
				})
				// 如果有项目未完成或无法解决则必须抄送
				if (ccIsMust && !Object.values(choseInfo['assistUpdate'] || {})[0]) {
					util.showModal('有项目未完成,请选择抄送人')
					return
				}
				let files = []
				for (let key in this.imgList) {
					this.imgList[key].forEach((item, index) => {
						if (item) {
							files.push({
								name: `image_${index}_${key}`,
								uri: item
							})
						}
					})
				}
				for (let key in this.video) {
					if (this.video[key]) {
						files.push({
							name: `video_${key}`,
							uri: this.video[key]
						})
					}
				}
				for (let key in this.voice) {
					if (this.voice[key]) {
						files.push({
							name: `voice_${key}`,
							uri: this.voice[key].url
						})
					}
				}

				let fileData = {}
				// 如果有文件再传
				if (files.length > 0) {
					fileData = {
						files
					}
				}
				DEBUG && console.log('上传文件列表', files, fileData);
				let assistUpdate = Object.keys(choseInfo['assistUpdate'] || {})
				let queryData = {
					check: JSON.stringify(this.checkInfo),
					assist: JSON.stringify(choseInfo),
					reason: JSON.stringify(reason),
					voice: JSON.stringify(this.voice),
					assistUpdate: JSON.stringify(assistUpdate),
					excutePs
				}
				// 加油量备注拦截
				if (this.detail.type == 5) {
					for (let key in self.checkInfo) {
						if (self.checkInfo[key] == 0 && !fuel[key]) {
							util.showModal('请填写加油量')
							return
						}
					}
					queryData.fuel = JSON.stringify(fuel)
					queryData.ps = JSON.stringify(ps)
				}
				if (choseInfo['assistUpdate']) {
					delete choseInfo['assistUpdate']
				}
				DEBUG && console.log('上传参数', queryData);
				util.showLoading('提交中...')
				uni.uploadFile({
					...fileData,
					url: SERVER_URL + '/user/taskSubmit', //仅为示例，非真实的接口地址
					header: {
						Authorization: `Bearer ${request.TOKEN}`
					},
					filePath: '',
					name: '',
					formData: queryData,
					success: (uploadFileRes) => {
						util.hideLoading()
						DEBUG && console.log(uploadFileRes.data);
						let res = JSON.parse(uploadFileRes.data)
						if (res.statusCode == 200) {
							util.goBack()
						} else {
							util.showModal(res.errmsg)
						}
					},
					fail: (err) => {
						util.showModal('上传失败,已为您自动保存数据', () => {
							util.goBack()
						})
						let fileList = []
						let imgList = self.imgList
						let voice = self.voice
						let video = self.video
						if (files.length > 0) {
							files.forEach((item, index) => {
								uni.saveFile({
									tempFilePath: item.uri,
									success: function(res) {
										// console.log('保存成功', res);
										if (item.type == 'IMAGE') {
											DEBUG && console.log('image', imgList, item.key);
											imgList[item.key][item.idx] = res.savedFilePath
										}
										if (item.type == 'VIDEO') {
											video[item.key] = res.savedFilePath
										}
										if (item.type == 'VOICE') {
											voice[item.key].url = res.savedFilePath
										}
										// 如果最后一个文件保存成功
										if (index == files.length - 1) {
											let appUrl = `/pages/maintain_verify/maintain_verify?id=${taskId}&uid=${uid}`
											let offlineInfo = {
												imgList,
												voice,
												video,
												reason,
												checkInfo: self.checkInfo,
												choseInfo,
												userChoseInfo: self.userChoseInfo,
												appUrl
											}
											uni.setStorage({
												key: OFFLINE_KEY,
												data: offlineInfo
											});
											DEBUG && console.log('离线数据', offlineInfo);
										}
									}
								})
							})
						} else {
							let appUrl = `/pages/check_verify/check_verify?id=${taskId}&uid=${uid}`
							let offlineInfo = {
								reason,
								checkInfo: self.checkInfo,
								choseInfo,
								userChoseInfo: self.userChoseInfo,
								appUrl
							}
							uni.setStorage({
								key: OFFLINE_KEY,
								data: offlineInfo
							});
							DEBUG && console.log('离线数据', offlineInfo);
						}
					}
				});
			}
		}
	}
</script>

<style scoped>
	.info {
		width: 100%;
		min-height: 100rpx;
		font-size: 31rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.title {
		width: 130rpx;
		font-weight: bold;
		margin-left: 31rpx;
	}

	.title-content {
		width: 547rpx;
		font-size: 28rpx;
		min-height: 20rpx;
		margin-left: 5rpx;
	}

	.chose-icon {
		width: 30rpx;
		height: 30rpx;
		border-radius: 25rpx;
	}

	.chose-content {
		font-size: 28rpx;
		margin-left: 20rpx;
		color: #626262;
	}

	.title-content-input {
		max-width: 547rpx;
		margin: 33rpx 0;
		font-size: 27rpx;
		color: #626262;
		min-height: 43rpx;
		margin-right: 40rpx;
	}

	.division {
		width: 683rpx;
		height: 93rpx;
		font-size: 27rpx;
		background-color: #F2F2F2;
		margin-bottom: 53rpx;
	}

	.add-icon {
		width: 37rpx;
		height: 37rpx;
		border-radius: 37rpx;
		margin-right: 38rpx;
	}

	.hour {
		font-size: 27rpx;
		min-width: 140rpx;
		height: 60rpx;
		margin-right: 18rpx;
		background-color: #F2F2F2;
	}

	.question-content {
		width: 683rpx;
		min-height: 195rpx;
		background-color: #F2F2F2;
		margin-left: 31rpx;
		margin-bottom: 59rpx;
	}

	.question-content-input {
		width: 660rpx;
		height: 170rpx;
		font-size: 27rpx;
		color: #626262;
		min-height: 93rpx;
		padding: 5rpx 5rpx;
	}

	.btn {
	width: 120rpx;
	height: 70rpx;
	background-color: #5786F7;
	line-height: 70rpx;
	font-size: 27rpx;
	color: #fff;
	text-align: center;
	margin-right: 25rpx;
	}

	.upload {
		width: 683rpx;
		margin-left: 31rpx;
	}

	.upload-img {
		position: relative;
		width: 150rpx;
		height: 150rpx;
	}

	.child-upload-img {
		position: relative;
		width: 135rpx;
		height: 135rpx;
	}

	.upload-video {
		width: 327rpx;
		min-height: 150rpx;
		margin-bottom: 73rpx;
	}

	.child-upload-video {
		position: relative;
		width: 280rpx;
		min-height: 250rpx;
		margin-bottom: 73rpx;
	}

	.video {
		width: 327rpx;
		height: 150rpx;
	}

	.child-video {
		width: 100%;
		height: 150rpx;
	}

	.cycle {
		min-width: 101rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.date {
		min-width: 399rpx;
		height: 60rpx;
		background-color: #F2F2F2;
	}

	.delete {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 45rpx;
		height: 45rpx;
		z-index: 99999;
	}
</style>
