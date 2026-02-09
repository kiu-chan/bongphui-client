<template>
  <main>
    <div>
      <SliderBanner />

      <div class="bg rounded-[29px]">
        <div class="bg2 rounded-t-[29px]">
          <div class="app-container container mx-auto py-10 px-4 lg:px-8">

            <!-- Header -->
            <div class="mb-6 mt-8 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 fee-header">
              <div>
                <h1 class="text-3xl md:text-4xl font-semibold">Thu / Chi — Giải đấu #{{ tournamentId }}</h1>
                <p class="text-sm text-gray-300 mt-1">Quản lý khoản thu/chi giải đấu</p>
              </div>

              <div class="flex items-center gap-3 flex-wrap">
                <NuxtLink
                  to="/quanlygiaidau"
                  class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Quay lại
                </NuxtLink>

                <button
                  @click="fetchFees"
                  :disabled="loading"
                  class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all"
                >
                  <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4v5h.582A5 5 0 1110 15v-1a4 4 0 10-3.464-6H4z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Làm mới
                </button>

                <button
                  @click="showForm = true"
                  class="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                  </svg>
                  Thêm mới
                </button>
              </div>
            </div>

            <!-- Summary cards -->
            <section class="grid sm:grid-cols-3 gap-4 mb-8">
              <div class="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div class="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">THU</div>
                </div>
                <div class="text-3xl font-bold text-green-600 mb-1">{{ formatCurrency(incomeSum) }}</div>
                <div class="text-sm text-gray-500">{{ incomeCount }} khoản</div>
              </div>

              <div class="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md p-6 border border-red-100 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <div class="p-2 bg-red-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </div>
                  <div class="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">CHI</div>
                </div>
                <div class="text-3xl font-bold text-red-600 mb-1">{{ formatCurrency(expenseSum) }}</div>
                <div class="text-sm text-gray-500">{{ expenseCount }} khoản</div>
              </div>

              <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">SỐ Dư</div>
                </div>
                <div :class="['text-3xl font-bold mb-1', displayedBalance >= 0 ? 'text-blue-600' : 'text-orange-600']">
                  {{ displayedBalance === null ? '-' : formatCurrency(displayedBalance) }}
                </div>
                <div class="text-sm text-gray-500">{{ items.length }} tổng khoản</div>
              </div>
            </section>

            <!-- Main table -->
            <section class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div class="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 class="font-semibold text-lg text-gray-800">Danh sách khoản thu/chi</h2>
              </div>

              <div class="p-6">
                <!-- loading skeleton -->
                <div v-if="loading" class="space-y-3">
                  <div v-for="n in 5" :key="n" class="animate-pulse flex gap-4 items-center">
                    <div class="h-12 w-12 bg-gray-200 rounded-lg"></div>
                    <div class="flex-1 space-y-2">
                      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div class="h-8 w-28 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <!-- error -->
                <div v-else-if="error" class="p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="text-red-700 font-medium mb-3">{{ error }}</div>
                  <button @click="fetchFees" class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Thử lại</button>
                </div>

                <!-- empty -->
                <div v-else-if="items.length === 0" class="p-12 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div class="text-lg font-medium text-gray-700 mb-2">Chưa có khoản thu/chi</div>
                  <div class="text-gray-500">Nhấn "Thêm mới" để tạo khoản đầu tiên</div>
                </div>

                <!-- table -->
                <div v-else class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="border-b border-gray-200">
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loại</th>
                        <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Số tiền</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ngày tạo</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Đội</th>
                        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ghi chú</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr v-for="fee in items" :key="fee.feesId" class="hover:bg-gray-50 transition-colors">
                        <td class="px-4 py-4 text-sm font-medium text-gray-700">#{{ fee.feesId }}</td>
                        <td class="px-4 py-4">
                          <span
                            class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                            :class="Number(fee.status) === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                          >
                            <svg v-if="Number(fee.status) === 1" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                            </svg>
                            {{ Number(fee.status) === 1 ? 'Thu' : 'Chi' }}
                          </span>
                        </td>
                        <td class="px-4 py-4 text-right">
                          <span :class="['text-sm font-bold', Number(fee.status) === 1 ? 'text-green-600' : 'text-red-600']">
                            {{ Number(fee.status) === 1 ? '+' : '-' }}{{ formatCurrency(fee.totalFee) }}
                          </span>
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-600">{{ formatDate(fee.createdDate) }}</td>
                        <td class="px-4 py-4">
                          <span v-if="fee.teamId" class="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                            Đội #{{ fee.teamId }}
                          </span>
                          <span v-else class="text-gray-400 text-sm">-</span>
                        </td>
                        <td class="px-4 py-4 text-sm text-gray-600 max-w-xs truncate" :title="fee.description">
                          {{ fee.description || '-' }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>

    <!-- Modal Popup Form -->
    <Transition name="modal">
      <div v-if="showForm" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <!-- Backdrop -->
          <Transition name="backdrop">
            <div v-if="showForm" class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" @click="closeModal"></div>
          </Transition>

          <!-- Modal Panel -->
          <Transition name="modal-content">
            <div v-if="showForm" class="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <!-- Header -->
              <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-white bg-opacity-20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-white">Thêm khoản thu/chi</h3>
                      <p class="text-green-50 text-sm mt-0.5">Tạo khoản mới cho giải đấu</p>
                    </div>
                  </div>
                  <button @click="closeModal" class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Form Body -->
              <div class="px-6 py-6 bg-gray-50">
                <div class="space-y-5">
                  <!-- Loại khoản - Radio Buttons -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-3">Loại khoản <span class="text-red-500">*</span></label>
                    <div class="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        @click="form.status = 1"
                        :class="[
                          'relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                          form.status === 1
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        ]"
                      >
                        <div :class="['p-2 rounded-lg', form.status === 1 ? 'bg-green-100' : 'bg-gray-100']">
                          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5', form.status === 1 ? 'text-green-600' : 'text-gray-400']" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="text-left">
                          <div :class="['font-semibold', form.status === 1 ? 'text-green-700' : 'text-gray-700']">Thu</div>
                          <div class="text-xs text-gray-500">Có teamId</div>
                        </div>
                        <div v-if="form.status === 1" class="absolute top-2 right-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </button>

                      <button
                        type="button"
                        @click="form.status = 2"
                        :class="[
                          'relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                          form.status === 2
                            ? 'border-red-500 bg-red-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        ]"
                      >
                        <div :class="['p-2 rounded-lg', form.status === 2 ? 'bg-red-100' : 'bg-gray-100']">
                          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5', form.status === 2 ? 'text-red-600' : 'text-gray-400']" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
                          </svg>
                        </div>
                        <div class="text-left">
                          <div :class="['font-semibold', form.status === 2 ? 'text-red-700' : 'text-gray-700']">Chi</div>
                          <div class="text-xs text-gray-500">Không teamId</div>
                        </div>
                        <div v-if="form.status === 2" class="absolute top-2 right-2">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Số tiền with formatted input -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Số tiền <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        ref="moneyInput"
                        :value="formattedMoney"
                        @input="handleMoneyInput"
                        @focus="handleMoneyFocus"
                        @blur="handleMoneyBlur"
                        placeholder="0"
                        class="w-full pl-12 pr-16 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-lg font-semibold"
                      />
                      <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <span class="text-gray-500 font-medium">VNĐ</span>
                      </div>
                    </div>
                    <!-- Preview formatted amount -->
                    <div v-if="form.totalFee > 0" class="mt-2 text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span>{{ formatCurrency(form.totalFee) }}</span>
                    </div>
                  </div>

                  <!-- ID Đội - Show only when status = 1 -->
                  <div v-if="form.status === 1">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      ID Đội
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <input
                        type="number"
                        v-model="form.teamId"
                        placeholder="Nhập ID đội"
                        class="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all"
                      />
                    </div>
                  </div>

                  <!-- Ghi chú -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Ghi chú
                    </label>
                    <div class="relative">
                      <div class="absolute top-3.5 left-0 pl-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <textarea
                        v-model="form.description"
                        placeholder="Mô tả chi tiết..."
                        rows="3"
                        class="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <!-- Error message -->
                  <Transition name="fade">
                    <div v-if="formError" class="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                      <div>
                        <p class="text-sm font-semibold text-red-800">Lỗi</p>
                        <p class="text-sm text-red-600 mt-0.5">{{ formError }}</p>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Footer Actions -->
              <div class="bg-gray-100 px-6 py-4 flex items-center justify-between gap-3">
                <div class="text-xs text-gray-500 flex items-center gap-1.5">
                  <span class="text-red-500 text-base">*</span>
                  <span>Trường bắt buộc</span>
                </div>
                <div class="flex gap-3">
                  <button
                    @click="closeModal"
                    type="button"
                    class="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    @click="submitCreate"
                    :disabled="creating"
                    class="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    <svg v-if="!creating" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{{ creating ? 'Đang lưu...' : 'Lưu khoản' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import SliderBanner from "~/component/library/sliderBanner/index.vue";
import { useRoute } from "vue-router";
import { useTournamentStore } from "~/store/tournament";

export default defineComponent({
  components: { SliderBanner },
  setup() {
    const route = useRoute();
    const tournamentId = String(route.params.id ?? "");

    const TournamentStore = useTournamentStore();
    const items = ref<any[]>([]);
    const loading = ref(false);
    const error = ref("");

    const serverBalance = ref<number | null>(null);
    const loadingBalance = ref(false);

    const showForm = ref(false);
    const creating = ref(false);
    const formError = ref("");
    const form = ref({
      totalFee: 0,
      description: "",
      teamId: "" as string | number | null,
      status: 1,
    });

    const moneyInput = ref<HTMLInputElement | null>(null);
    const isEditingMoney = ref(false);

    // Format money for display
    const formattedMoney = computed(() => {
      if (isEditingMoney.value) {
        // While editing, show plain number
        return form.value.totalFee > 0 ? String(form.value.totalFee) : "";
      }
      // When not editing, show formatted
      if (form.value.totalFee === 0) return "";
      return formatNumberWithCommas(form.value.totalFee);
    });

    const formatNumberWithCommas = (num: number): string => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const parseFormattedNumber = (str: string): number => {
      // Remove all commas and parse as number
      const cleaned = str.replace(/,/g, "");
      const parsed = parseInt(cleaned, 10);
      return isNaN(parsed) ? 0 : parsed;
    };

    const handleMoneyInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const rawValue = target.value;
      
      // Parse the number (remove commas)
      const numValue = parseFormattedNumber(rawValue);
      form.value.totalFee = numValue;
    };

    const handleMoneyFocus = () => {
      isEditingMoney.value = true;
    };

    const handleMoneyBlur = () => {
      isEditingMoney.value = false;
    };

    const fetchFees = async () => {
      if (!tournamentId) {
        error.value = "Thiếu tournamentId trong route.";
        items.value = [];
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        const res: any = await TournamentStore.fnGetFeesTournament(tournamentId);

        let data: any[] = [];
        if (Array.isArray(res)) data = res;
        else if (res && Array.isArray(res.data)) data = res.data;
        else if (res && Array.isArray(res.data?.items)) data = res.data.items;
        else if (Array.isArray(res.items)) data = res.items;
        else data = [];

        items.value = Array.isArray(data)
          ? data.map((d: any) => ({
              feesId: d.feesId,
              totalFee: Number(d.totalFee ?? 0),
              createdDate: d.createdDate,
              description: d.description,
              tournamentId: d.tournamentId,
              teamId: d.teamId,
              status: d.status,
              statusDescription: d.statusDescription,
            }))
          : [];
      } catch (err: any) {
        console.error("Lỗi khi lấy fees:", err);
        error.value = "Lỗi khi tải dữ liệu thu/chi. Vui lòng thử lại.";
        items.value = [];
      } finally {
        loading.value = false;
      }
    };

    const fetchBalance = async () => {
      if (!tournamentId) {
        serverBalance.value = null;
        return;
      }
      loadingBalance.value = true;
      try {
        const res: any = await TournamentStore.fnGetFeesBalance(tournamentId);
        let val: number | null = null;
        if (typeof res === "number") val = res;
        else if (res && typeof res.data === "number") val = res.data;
        else if (res && typeof res.data?.balance === "number") val = res.data.balance;
        else if (res && !isNaN(Number(res))) val = Number(res);
        else val = null;

        serverBalance.value = val;
      } catch (err) {
        console.error("Lỗi khi lấy balance:", err);
        serverBalance.value = null;
      } finally {
        loadingBalance.value = false;
      }
    };

    const submitCreate = async () => {
      formError.value = "";
      if (!tournamentId) {
        formError.value = "Thiếu tournamentId.";
        return;
      }
      if (!form.value.totalFee || Number(form.value.totalFee) <= 0) {
        formError.value = "Vui lòng nhập số tiền hợp lệ (> 0).";
        return;
      }
      creating.value = true;
      try {
        const payload: any = {
          feesId: 0,
          totalFee: Number(form.value.totalFee),
          createdDate: new Date().toISOString(),
          description: form.value.description || "",
          tournamentId: Number(tournamentId),
          teamId:
            form.value.teamId === "" || form.value.teamId === null
              ? null
              : Number(form.value.teamId),
          status: Number(form.value.status),
        };

        await TournamentStore.fnCreateFee(payload);

        await fetchFees();
        await fetchBalance();

        form.value.totalFee = 0;
        form.value.description = "";
        form.value.teamId = "";
        form.value.status = 1;
        showForm.value = false;
      } catch (err: any) {
        console.error("Lỗi tạo khoản thu/chi:", err);
        formError.value = err?.message ?? "Lỗi khi tạo khoản thu/chi.";
      } finally {
        creating.value = false;
      }
    };

    const resetForm = () => {
      formError.value = "";
      form.value.totalFee = 0;
      form.value.description = "";
      form.value.teamId = "";
      form.value.status = 1;
      isEditingMoney.value = false;
    };

    const closeModal = () => {
      if (!creating.value) {
        showForm.value = false;
        resetForm();
      }
    };

    onMounted(() => {
      fetchFees();
      fetchBalance();
    });

    const incomeSum = computed(() => items.value.reduce((s, f) => s + (Number(f.status) === 1 ? Number(f.totalFee || 0) : 0), 0));
    const expenseSum = computed(() => items.value.reduce((s, f) => s + (Number(f.status) === 2 ? Number(f.totalFee || 0) : 0), 0));
    const incomeCount = computed(() => items.value.filter((f) => Number(f.status) === 1).length);
    const expenseCount = computed(() => items.value.filter((f) => Number(f.status) === 2).length);

    const clientBalance = computed(() => incomeSum.value - expenseSum.value);
    const displayedBalance = computed(() => {
      return serverBalance.value !== null ? serverBalance.value : clientBalance.value;
    });

    const formatCurrency = (v: number | null) => {
      if (v == null || Number.isNaN(Number(v))) return "-";
      try {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(v));
      } catch {
        return String(v);
      }
    };

    const formatDate = (d: string) => {
      if (!d) return "-";
      try {
        const dt = new Date(d);
        return dt.toLocaleString("vi-VN");
      } catch {
        return d;
      }
    };

    return {
      tournamentId,
      items,
      loading,
      error,
      fetchFees,
      fetchBalance,
      serverBalance,
      loadingBalance,
      showForm,
      form,
      creating,
      formError,
      submitCreate,
      resetForm,
      closeModal,
      incomeSum,
      expenseSum,
      incomeCount,
      expenseCount,
      displayedBalance,
      formatCurrency,
      formatDate,
      moneyInput,
      formattedMoney,
      handleMoneyInput,
      handleMoneyFocus,
      handleMoneyBlur,
    };
  },
});
</script>

<style scoped>
.app-container {
  position: relative;
  z-index: 2;
}

.fee-header {
  padding-top: 6px;
}

tbody tr:hover {
  background-color: #fafafa;
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease-out;
}

.modal-content-leave-active {
  transition: all 0.2s ease-in;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .container {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>