'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ArgumentsRequired, BadRequest, InvalidAddress, NotSupported } = require ('./base/errors');

//  ---------------------------------------------------------------------------

module.exports = class gooplex extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'gooplex',
            'name': 'Gooplex',
            'countries': [ 'BR' ], // US
            'certified': false,
            'pro': false,
            'has': {
                'cancelAllOrders': 'emulated',
                'cancelOrder': true,
                'CORS': false,
                'createOrder': true,
                'fetchBalance': true,
                'fetchBidsAsks': true,
                'fetchClosedOrders': 'emulated',
                'fetchDepositAddress': true,
                'fetchDeposits': true,
                'fetchFundingFees': false,
                'fetchMarkets': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOrderBook': true,
                'fetchStatus': 'emulated',
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': 'emulated',
                'fetchTradingFees': 'emulated',
                'fetchTransactions': false,
                'fetchWithdrawals': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '3m': '3m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '2h': '2h',
                '4h': '4h',
                '6h': '6h',
                '8h': '8h',
                '12h': '12h',
                '1d': '1d',
                '3d': '3d',
                '1w': '1w',
                '1M': '1M',
            },
            'urls': {
                'doc': 'https://www.gooplex.com.br/apidocs/#api-document-description',
                'fees': 'https://gooplex.zendesk.com/hc/pt/articles/360049326131-O-que-s%C3%A3o-taxas-de-negocia%C3%A7%C3%A3o-',
                'logo': 'https://user-images.githubusercontent.com/228850/93481157-a0a2cb00-f8d4-11ea-8608-d56dd916a9ed.jpg',
                'referral': 'https://www.gooplex.com.br/account/signup?ref=H8QQ57WT',
                'www': 'https://www.gooplex.com.br',
                // API
                'api': {
                    'open': 'https://www.gooplex.com.br/open/v1',
                    'signed': 'https://www.gooplex.com.br/open/v1',
                    'api': 'https://api.binance.com/api',
                    'wapi': 'https://api.binance.com/wapi/v3',
                    'sapi': 'https://api.binance.com/sapi/v1',
                    'dapiPublic': 'https://dapi.binance.com/dapi/v1',
                    'dapiPrivate': 'https://dapi.binance.com/dapi/v1',
                    'fapiPublic': 'https://fapi.binance.com/fapi/v1',
                    'fapiPrivate': 'https://fapi.binance.com/fapi/v1',
                    'public': 'https://api.binance.com/api/v3',
                    'private': 'https://api.binance.com/api/v3',
                },
            },
            'api': {
                'open': {               // public
                    'get': [
                        'common/time',
                        'common/symbols',
                        'market/depth',
                    ],
                },
                'signed': {             // private
                    'get': [
                        'orders',
                        'orders/detail',
                        'orders/trades',
                        'account/spot',
                        'deposits',
                        'deposits/address',
                        'withdraws',
                    ],
                    'post': [
                        'orders',
                        'orders/cancel',
                        'withdraws',
                    ],
                },
                'api': {
                    'get': [
                        'v3/depth',
                        'v3/trades',
                        'v3/aggTrades',
                    ],
                },
                'sapi': {
                    'get': [
                        'accountSnapshot',
                        // these endpoints require this.apiKey
                        'margin/asset',
                        'margin/pair',
                        'margin/allAssets',
                        'margin/allPairs',
                        'margin/priceIndex',
                        // these endpoints require this.apiKey + this.secret
                        'asset/assetDividend',
                        'margin/loan',
                        'margin/repay',
                        'margin/account',
                        'margin/transfer',
                        'margin/interestHistory',
                        'margin/forceLiquidationRec',
                        'margin/order',
                        'margin/openOrders',
                        'margin/allOrders',
                        'margin/myTrades',
                        'margin/maxBorrowable',
                        'margin/maxTransferable',
                        'margin/isolated/transfer',
                        'margin/isolated/account',
                        'margin/isolated/pair',
                        'margin/isolated/allPairs',
                        'futures/transfer',
                        'futures/loan/borrow/history',
                        'futures/loan/repay/history',
                        'futures/loan/wallet',
                        'futures/loan/configs',
                        'futures/loan/calcAdjustLevel',
                        'futures/loan/calcMaxAdjustAmount',
                        'futures/loan/adjustCollateral/history',
                        'futures/loan/liquidationHistory',
                        // https://binance-docs.github.io/apidocs/spot/en/#withdraw-sapi
                        'capital/config/getall', // get networks for withdrawing USDT ERC20 vs USDT Omni
                        'capital/deposit/address',
                        'capital/deposit/hisrec',
                        'capital/deposit/subAddress',
                        'capital/deposit/subHisrec',
                        'capital/withdraw/history',
                        'sub-account/futures/account',
                        'sub-account/futures/accountSummary',
                        'sub-account/futures/positionRisk',
                        'sub-account/futures/internalTransfer',
                        'sub-account/margin/account',
                        'sub-account/margin/accountSummary',
                        'sub-account/spotSummary',
                        'sub-account/status',
                        'sub-account/transfer/subUserHistory',
                        // lending endpoints
                        'lending/daily/product/list',
                        'lending/daily/userLeftQuota',
                        'lending/daily/userRedemptionQuota',
                        'lending/daily/token/position',
                        'lending/union/account',
                        'lending/union/purchaseRecord',
                        'lending/union/redemptionRecord',
                        'lending/union/interestHistory',
                        'lending/project/list',
                        'lending/project/position/list',
                        // mining endpoints
                        'mining/pub/algoList',
                        'mining/pub/coinList',
                        'mining/worker/detail',
                        'mining/worker/list',
                        'mining/payment/list',
                        'mining/statistics/user/status',
                        'mining/statistics/user/list',
                    ],
                    'post': [
                        'asset/dust',
                        'account/disableFastWithdrawSwitch',
                        'account/enableFastWithdrawSwitch',
                        'capital/withdraw/apply',
                        'margin/transfer',
                        'margin/loan',
                        'margin/repay',
                        'margin/order',
                        'margin/isolated/create',
                        'margin/isolated/transfer',
                        'sub-account/margin/transfer',
                        'sub-account/margin/enable',
                        'sub-account/margin/enable',
                        'sub-account/futures/enable',
                        'sub-account/futures/transfer',
                        'sub-account/futures/internalTransfer',
                        'sub-account/transfer/subToSub',
                        'sub-account/transfer/subToMaster',
                        'userDataStream',
                        'userDataStream/isolated',
                        'futures/transfer',
                        'futures/loan/borrow',
                        'futures/loan/repay',
                        'futures/loan/adjustCollateral',
                        // lending
                        'lending/customizedFixed/purchase',
                        'lending/daily/purchase',
                        'lending/daily/redeem',
                    ],
                    'put': [
                        'userDataStream',
                        'userDataStream/isolated',
                    ],
                    'delete': [
                        'margin/order',
                        'userDataStream',
                        'userDataStream/isolated',
                    ],
                },
                'wapi': {
                    'post': [
                        'withdraw',
                        'sub-account/transfer',
                    ],
                    'get': [
                        'depositHistory',
                        'withdrawHistory',
                        'depositAddress',
                        'accountStatus',
                        'systemStatus',
                        'apiTradingStatus',
                        'userAssetDribbletLog',
                        'tradeFee',
                        'assetDetail',
                        'sub-account/list',
                        'sub-account/transfer/history',
                        'sub-account/assets',
                    ],
                },
                'dapiPublic': {
                    'get': [
                        'ping',
                        'time',
                        'exchangeInfo',
                        'depth',
                        'trades',
                        'historicalTrades',
                        'aggTrades',
                        'premiumIndex',
                        'fundingRate',
                        'klines',
                        'continuousKlines',
                        'indexPriceKlines',
                        'markPriceKlines',
                        'ticker/24hr',
                        'ticker/price',
                        'ticker/bookTicker',
                        'allForceOrders',
                        'openInterest',
                    ],
                },
                'dapiPrivate': {
                    'get': [
                        'positionSide/dual',
                        'order',
                        'openOrder',
                        'openOrders',
                        'allOrders',
                        'balance',
                        'account',
                        'positionMargin/history',
                        'positionRisk',
                        'userTrades',
                        'income',
                        'leverageBracket',
                        'forceOrders',
                        'adlQuantile',
                    ],
                    'post': [
                        'positionSide/dual',
                        'order',
                        'batchOrders',
                        'countdownCancelAll',
                        'leverage',
                        'marginType',
                        'positionMargin',
                        'listenKey',
                    ],
                    'put': [
                        'listenKey',
                    ],
                    'delete': [
                        'order',
                        'allOpenOrders',
                        'batchOrders',
                        'listenKey',
                    ],
                },
                'fapiPublic': {
                    'get': [
                        'ping',
                        'time',
                        'exchangeInfo',
                        'depth',
                        'trades',
                        'historicalTrades',
                        'aggTrades',
                        'klines',
                        'fundingRate',
                        'premiumIndex',
                        'ticker/24hr',
                        'ticker/price',
                        'ticker/bookTicker',
                        'allForceOrders',
                        'openInterest',
                    ],
                },
                'fapiPrivate': {
                    'get': [
                        'allForceOrders',
                        'allOrders',
                        'openOrder',
                        'openOrders',
                        'order',
                        'account',
                        'balance',
                        'leverageBracket',
                        'positionMargin/history',
                        'positionRisk',
                        'positionSide/dual',
                        'userTrades',
                        'income',
                    ],
                    'post': [
                        'batchOrders',
                        'positionSide/dual',
                        'positionMargin',
                        'marginType',
                        'order',
                        'leverage',
                        'listenKey',
                        'countdownCancelAll',
                    ],
                    'put': [
                        'listenKey',
                    ],
                    'delete': [
                        'batchOrders',
                        'order',
                        'allOpenOrders',
                        'listenKey',
                    ],
                },
                'public': {
                    'get': [
                        'ping',
                        'time',
                        'depth',
                        'trades',
                        'aggTrades',
                        'historicalTrades',
                        'klines',
                        'ticker/24hr',
                        'ticker/price',
                        'ticker/bookTicker',
                        'exchangeInfo',
                    ],
                    'put': [ 'userDataStream' ],
                    'post': [ 'userDataStream' ],
                    'delete': [ 'userDataStream' ],
                },
                'private': {
                    'get': [
                        'allOrderList', // oco
                        'openOrderList', // oco
                        'orderList', // oco
                        'order',
                        'openOrders',
                        'allOrders',
                        'account',
                        'myTrades',
                    ],
                    'post': [
                        'order/oco',
                        'order',
                        'order/test',
                    ],
                    'delete': [
                        'openOrders', // added on 2020-04-25 for canceling all open orders per symbol
                        'orderList', // oco
                        'order',
                    ],
                },
            },
            'orderlimits': [
                5,
                10,
                20,
                50,
                100,
                500,
            ],
            'sides': {
                'buy': 0,
                'sell': 1,
            },
            'types': {
                'limit': 1,
                'market': 2,
                'stop_loss': 3,
                'stop_loss_limit': 4,
                'take_profit': 5,
                'take_profit_limit': 6,
                'limit_maker': 7,
            },
            'fees': {
                'trading': {
                    'taker': 0.0022, // 0.22% trading fee
                    'maker': 0.0022, // 0.22% trading fee
                },
            },
        });
    }

    sign (path, api = 'open', method = 'GET', params = {}, headers = undefined, body = undefined) {
        if (!(api in this.urls['api'])) {
            throw new NotSupported (this.id + ' does not have a testnet/sandbox URL for ' + api + ' endpoints');
        }
        let url = this.urls['api'][api];
        url += '/' + path;
        if (api === 'signed') {
            this.checkRequiredCredentials ();
            headers = {
                'X-MBX-APIKEY': this.apiKey,
            };
            const recvWindow = this.safeInteger (this.options, 'recvWindow', 5000);
            let query = undefined;
            query = this.urlencodeWithArrayRepeat (this.extend ({
                'timestamp': this.nonce (),
                'recvWindow': recvWindow,
            }, params));
            const signature = this.hmac (this.encode (query), this.encode (this.secret));
            query += '&signature=' + signature;
            url += '?' + query;
        } else {
            if (method === 'GET') {
                if (Object.keys (params).length) {
                    url += '?' + this.urlencode (params);
                }
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    getFees () {
        const feesKey = 'fees';
        const fees = this[feesKey];
        return this.safeValue (fees, 'trading');
    }

    convertSymbol (market) {
        const trading_fees = this.getFees ();
        const symbol = this.safeString (market, 'symbol');
        const id = symbol.replace ('_', '/');
        const id2 = symbol.replace ('_', '');
        const id3 = symbol.replace ('/', '');
        const entry = {
            'id': symbol,
            'symbol': id,
            'symbol2': id2,
            'symbol3': id3,
            'base': this.safeCurrencyCode (this.safeValue (market, 'baseAsset')),
            'quote': this.safeCurrencyCode (this.safeValue (market, 'quoteAsset')),
            'active': true,
            'taker': this.safeFloat (trading_fees, 'taker'),
            'maker': this.safeFloat (trading_fees, 'maker'),
            'percetage': true,
            'tierBase': false,
            'precision': {
                'price': this.safeInteger (market, 'quotePrecision'),
                'amount': this.safeInteger (market, 'basePrecision'),
                'cost': this.safeInteger (market, 'basePrecision'),
            },
            'limits': {
                'amount': {
                    'min': undefined,
                    'max': undefined,
                },
                'price': {
                    'min': undefined,
                    'max': undefined,
                },
                'cost': {
                    'min': undefined,
                    'max': undefined,
                },
            },
            'info': market,
        };
        return entry;
    }

    convertTrade (symbol, trade) {
        const id = this.safeString (trade, 'id');
        const timestamp = this.safeTimestamp (trade, 'time') / 1000;
        const datetime = this.iso8601 (timestamp);
        const fee = null;
        const price = this.safeFloat (trade, 'price');
        const amount = this.safeFloat (trade, 'qty');
        const order = '';
        const type = 'limit';
        const side = 'buy';
        const cost = 0.00;
        let takerOrMaker = undefined;
        if (this.safeValue (trade, 'isBuyerMaker')) {
            takerOrMaker = 'maker';
        } else {
            takerOrMaker = 'taker';
        }
        const info = {
            'M': trade['isBestMatch'],
            'T': trade['time'],
            'a': trade['id'],
            'f': undefined,
            'l': undefined,
            'm': trade['isBuyerMaker'],
            'p': trade['price'],
            'q': trade['qty'],
        };
        const entry = {
            'info': info,
            'id': id,
            'timestamp': timestamp,
            'datetime': datetime,
            'fee': fee,
            'symbol': symbol,
            'order': order,
            'type': type,
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': price,
            'amount': amount,
            'cost': cost,
        };
        return entry;
    }

    async fetchTime (params = {}) {
        const method = 'openGetCommonTime';
        const response = await this[method] (params);
        return this.safeInteger (response, 'timestamp');
    }

    async fetchStatus (params = {}) {
        const status = 'ok';
        this.status = this.extend (this.status, {
            'status': status,
            'updated': this.milliseconds (),
        });
        return this.status;
    }

    async fetchMarkets (params = {}) {
        const method = 'openGetCommonSymbols';
        const response = await this[method] (params);
        const data = this.safeValue (response, 'data');
        const markets = this.safeValue (data, 'list');
        let marketType = 'spot';
        const result = [];
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            let future = false;
            let delivery = false;
            const tierBased = false;
            const spot = !(future || delivery);
            const conversion = this.convertSymbol (market);
            const id = conversion['symbol2'];
            const lowercaseId = this.safeStringLower (conversion, 'symbol2');
            const baseId = this.safeString (market, 'baseAsset');
            const quoteId = this.safeString (market, 'quoteAsset');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const symbol = delivery ? id : (base + '/' + quote);
            const precision = {
                'base': this.safeInteger (market, 'basePrecision'),
                'quote': this.safeInteger (market, 'quotePrecision'),
                'amount': this.safeInteger (market, 'basePrecision'),
                'price': this.safeInteger (market, 'quotePrecision'),
            };
            if ('maintMarginPercent' in market) {
                delivery = ('marginAsset' in market);
                future = !delivery;
                marketType = delivery ? 'delivery' : 'future';
            }
            const status = this.safeString2 (market, 'status', 'contractStatus');
            const active = (status === 'TRADING');
            const margin = this.safeValue (market, 'isMarginTradingAllowed', future || delivery);
            const info = {
                'baseAsset': baseId,
                'baseAssetPrecision': precision['base'],
                'baseComissionPrecision': precision['base'],
                'filters': market['filters'],
                'icebergAllowed': true,
                'isMarginTradingAllowed': false,
                'isSpotTradingAllowed': true,
                'ocoAllowed': true,
                'orderTypes': ['LIMIT', 'LIMIT_MAKER', 'MARKET', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT_LIMIT'],
                'permissions': ['SPOT'],
                'quoteAsset': quoteId,
                'quoteAssetPrecision': precision['base'],
                'quoteComissionPrecision': precision['base'],
                'quoteOrderQtyMarketAlloed': true,
                'quotePrecision': precision['base'],
                'status': status,
                'symbol': id,
            };
            const entry = {
                'id': id,
                'lowercaseId': lowercaseId,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'baseId': baseId,
                'quoteId': quoteId,
                'info': info,
                'type': marketType,
                'spot': spot,
                'margin': margin,
                'future': future,
                'delivery': delivery,
                'active': active,
                'precision': precision,
                'limits': {
                    'amount': {
                        'min': Math.pow (10, -precision['amount']),
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'market': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'tierBased': tierBased,
            };
            result.push (entry);
        }
        return result;
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired ('fetchOrderBook requires a symbol argument');
        }
        const method = 'openGetMarketDepth';
        await this.loadMarkets ();
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this[method] (this.extend (request, params));
        return this.parseOrderBook (response);
    }

    async fetchOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired ('fetchOrders requires a symbol argument');
        }
        const method = 'signedGetOrders';
        await this.loadMarkets ();
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this[method] (this.extend (request, params));
        return response['data']['list'];                // map
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        let requestSide = undefined;
        let requestType = undefined;
        if (symbol === undefined) {
            throw new ArgumentsRequired ('createOrder requires a symbol argument');
        }
        if (side in this.sides) {
            requestSide = this.sides[side];
        } else {
            throw new NotSupported ('Side ' + side + ' not supported');
        }
        if (type in this.types) {
            requestType = this.types[type];
        } else {
            throw new NotSupported ('Type ' + type + ' not supported.');
        }
        const method = 'signedPostOrders';
        await this.loadMarkets ();
        const request = {
            'symbol': this.markets[symbol]['id'],
            'side': requestSide,
            'type': requestType,
            'quantity': amount,
        };
        if (price !== undefined) {
            request['price'] = price;
        }
        const response = await this[method] (this.extend (request, params));
        return response;
    }

    async fetchOrder (id, symbol = undefined, params = {}) {
        const method = 'signedGetOrdersDetail';
        const request = {
            'orderId': id,
        };
        const response = await this[method] (this.extend (request, params));
        return response;
    }

    async fetchClosedOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const orders = await this.fetchOrders (symbol, since, limit, params);
        return this.filterBy (orders, 'status', 'closed');
    }

    parseTransactionStatusByType (status, type = undefined) {
        const statusesByType = {
            'deposit': {
                '0': 'pending',
                '1': 'ok',
            },
            'withdrawal': {
                '0': 'pending', // Email Sent
                '1': 'canceled', // Cancelled (different from 1 = ok in deposits)
                '2': 'pending', // Awaiting Approval
                '3': 'failed', // Rejected
                '4': 'pending', // Processing
                '5': 'failed', // Failure
                '6': 'ok', // Completed
            },
        };
        const statuses = this.safeValue (statusesByType, type, {});
        return this.safeString (statuses, status, status);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        // fetchDeposits
        //
        //     {
        //         insertTime:  1517425007000,
        //         amount:  0.3,
        //         address: "0x0123456789abcdef",
        //         addressTag: "",
        //         txId: "0x0123456789abcdef",
        //         asset: "ETH",
        //         status:  1
        //     }
        //
        // fetchWithdrawals
        //
        //     {
        //         amount:  14,
        //         address: "0x0123456789abcdef...",
        //         successTime:  1514489710000,
        //         transactionFee:  0.01,
        //         addressTag: "",
        //         txId: "0x0123456789abcdef...",
        //         id: "0123456789abcdef...",
        //         asset: "ETH",
        //         applyTime:  1514488724000,
        //         status:  6
        //     }
        //
        const id = this.safeString (transaction, 'id');
        const address = this.safeString (transaction, 'address');
        let tag = this.safeString (transaction, 'addressTag'); // set but unused
        if (tag !== undefined) {
            if (tag.length < 1) {
                tag = undefined;
            }
        }
        const txid = this.safeString (transaction, 'txId');
        const currencyId = this.safeString (transaction, 'asset');
        const code = this.safeCurrencyCode (currencyId, currency);
        let timestamp = undefined;
        const insertTime = this.safeInteger (transaction, 'insertTime');
        const applyTime = this.safeInteger (transaction, 'applyTime');
        let type = this.safeString (transaction, 'type');
        if (type === undefined) {
            if ((insertTime !== undefined) && (applyTime === undefined)) {
                type = 'deposit';
                timestamp = insertTime;
            } else if ((insertTime === undefined) && (applyTime !== undefined)) {
                type = 'withdrawal';
                timestamp = applyTime;
            }
        }
        const status = this.parseTransactionStatusByType (this.safeString (transaction, 'status'), type);
        const amount = this.safeFloat (transaction, 'amount');
        const feeCost = this.safeFloat (transaction, 'transactionFee');
        let fee = undefined;
        const transactions = {
            'address': address,
            'addressTag': tag,
            'amount': amount,
            'asset': currencyId,
            'creator': id,
            'insertTime': insertTime,
            'status': transaction['status'],
            'txId': txid,
        };
        if (feeCost !== undefined) {
            fee = { 'currency': code, 'cost': feeCost };
        }
        return {
            'info': transactions,
            'id': id,
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'address': address,
            'tag': tag,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': undefined,
            'fee': fee,
        };
    }

    async fetchDepositAddress (code, params = {}) {
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'asset': currency['id'],
        };
        const response = await this.signedGetDepositsAddress (this.extend (request, params));
        const success = this.safeValue (response, 'msg');
        if (success !== 'Success') {
            throw new InvalidAddress (this.id + ' fetchDepositAddress returned an empty response – create the deposit address in the user settings first.');
        }
        const address = this.safeString (response['data'], 'address');
        const tag = this.safeString (response['data'], 'addressTag');
        const status = parseInt (response['data']['status']);
        let response_status = false;
        if (status === 1) {
            response_status = true;
        } else {
            response_status = false;
        }
        const info = {
            'address': response['data']['address'],
            'addressTag': response['data']['addressTag'],
            'asset': response['data']['asset'],
            'success': response_status,
            'url': 'https://blockchair.com/bitcoin/address/' + address,
        };
        this.checkAddress (address);
        return {
            'currency': code,
            'address': address,
            'tag': tag,
            'info': info,
        };
    }

    async fetchDeposits (code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let currency = undefined;
        const request = {};
        if (code !== undefined) {
            currency = this.currency (code);
            request['asset'] = currency['id'];
        }
        if (since !== undefined) {
            request['startTime'] = since;
            // max 3 months range https://github.com/ccxt/ccxt/issues/6495
            request['endTime'] = this.sum (since, 7776000000);
        }
        const response = await this.signedGetDeposits (this.extend (request, params));
        //
        //     {     success:    true,
        //       depositList: [ { insertTime:  1517425007000,
        //                            amount:  0.3,
        //                           address: "0x0123456789abcdef",
        //                        addressTag: "",
        //                              txId: "0x0123456789abcdef",
        //                             asset: "ETH",
        //                            status:  1                                                                    } ] }
        //
        return this.parseTransactions (response['data']['list'], currency, since, limit);
    }

    async fetchWithdrawals (code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        let currency = undefined;
        const request = {};
        if (code !== undefined) {
            currency = this.currency (code);
            request['asset'] = currency['id'];
        }
        if (since !== undefined) {
            request['startTime'] = since;
            // max 3 months range https://github.com/ccxt/ccxt/issues/6495
            request['endTime'] = this.sum (since, 7776000000);
        }
        const response = await this.signedGetWithdraws (this.extend (request, params));
        //
        //     { withdrawList: [ {      amount:  14,
        //                             address: "0x0123456789abcdef...",
        //                         successTime:  1514489710000,
        //                      transactionFee:  0.01,
        //                          addressTag: "",
        //                                txId: "0x0123456789abcdef...",
        //                                  id: "0123456789abcdef...",
        //                               asset: "ETH",
        //                           applyTime:  1514488724000,
        //                              status:  6                       },
        //                       {      amount:  7600,
        //                             address: "0x0123456789abcdef...",
        //                         successTime:  1515323226000,
        //                      transactionFee:  0.01,
        //                          addressTag: "",
        //                                txId: "0x0123456789abcdef...",
        //                                  id: "0123456789abcdef...",
        //                               asset: "ICN",
        //                           applyTime:  1515322539000,
        //                              status:  6                       }  ],
        //            success:    true                                         }
        //
        return this.parseTransactions (response['data']['list'], currency, since, limit);
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        this.checkAddress (address);
        await this.loadMarkets ();
        const currency = this.currency (code);
        // name is optional, can be overrided via params
        const name = address.slice (0, 20);
        const request = {
            'asset': currency['id'],
            'address': address,
            'amount': parseFloat (amount),
            'name': name, // name is optional, can be overrided via params
            // https://binance-docs.github.io/apidocs/spot/en/#withdraw-sapi
            // issue sapiGetCapitalConfigGetall () to get networks for withdrawing USDT ERC20 vs USDT Omni
            // 'network': 'ETH', // 'BTC', 'TRX', etc, optional
        };
        if (tag !== undefined) {
            request['addressTag'] = tag;
        }
        const response = await this.signedPostWithdraws (this.extend (request, params));
        return {
            'info': response,
            'id': this.safeString (response, 'id'),
        };
    }

    parseTradingFee (fee, market = undefined) {
        //
        //     {
        //         "symbol": "ADABNB",
        //         "maker": 0.9000,
        //         "taker": 1.0000
        //     }
        //
        const marketId = this.safeString (fee, 'symbol');
        const symbol = this.safeSymbol (marketId);
        return {
            'info': fee,
            'symbol': symbol,
            'maker': this.safeFloat (fee, 'maker'),
            'taker': this.safeFloat (fee, 'taker'),
        };
    }

    async fetchTradingFee (symbol, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired ('fetchTradingFee requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const conversion = this.convertSymbol (market);
        //
        //     {
        //         "tradeFee": [
        //             {
        //                 "symbol": "ADABNB",
        //                 "maker": 0.9000,
        //                 "taker": 1.0000
        //             }
        //         ],
        //         "success": true
        //     }
        //
        const fees = this.getFees ();
        const response = this.convertTradingFees (conversion['symbol2'], fees['maker'], fees['taker']);
        return response;
    }

    convertTradingFees (symbol, maker, taker) {
        // const market = this.market (symbol);
        const conversion = this.convertSymbol (this.market (symbol));
        return {
            'info': {
                'maker': maker,
                'symbol': conversion['symbol3'],
                'taker': taker,
            },
            'maker': maker,
            'symbol': symbol,
            'taker': taker,
        };
    }

    async fetchTradingFees (params = {}) {
        await this.loadMarkets ();
        //
        //     {
        //         "tradeFee": [
        //             {
        //                 "symbol": "ADABNB",
        //                 "maker": 0.9000,
        //                 "taker": 1.0000
        //             }
        //         ],
        //         "success": true
        //     }
        //
        const markets = this.fetchMarkets ();
        const fees = this.getFees ();
        const response = {};
        for (let index = 0; index < markets.length; index++) {
            const symbol = markets[index]['symbol'];
            response[symbol] = (this.convertTradingFees (symbol, fees['maker'], fees['taker']));
        }
        return response;
    }

    async cancelOrder (id, symbol = undefined, params = {}) {
        if (id === undefined) {
            throw new ArgumentsRequired ('cancelOrder requires a id argument');
        }
        const method = 'signedPostOrdersCancel';
        const request = {
            'orderId': id,
        };
        const response = await this[method] (this.extend (request, params));
        return response;                        // map
    }

    async cancelAllOrders (symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired ('cancelAllOrders requires a symbol argument');
        }
        const orders = this.fetchOrders (symbol);
        const method = 'signedPostOrdersCancel';
        const response = [];
        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            const request = {
                'orderId': order['id'],
                'timestamp': this.nonce (),
            };
            const data = await this[method] (this.extend (request));
            response.push (data);
        }
        return response;
    }

    async fetchBalance (params = {}) {
        const method = 'signedGetAccountSpot';
        const response = await this[method] (params);
        const balance = response['data']['accountAssets'];
        if (balance === undefined) {
            throw new BadRequest ('This operation is not supported');
        }
        const data = {};
        const exp_free = [];
        const exp_used = [];
        const exp_total = [];
        const pre_permitidos = [];
        pre_permitidos.push ('SPOT');
        const exp_balances = [];
        const timestamp = response['timestamp'];
        const buyerCommission = parseFloat (response['data']['buyerCommission']);
        const makerCommission = parseFloat (response['data']['makerCommission']);
        const takerCommission = parseFloat (response['data']['takerCommission']);
        const sellerCommission = parseFloat (response['data']['sellerCommission']);
        const canDeposit = response['data']['canDeposit'];
        const canTrade = response['data']['canTrade'];
        const canWithdraw = response['data']['canWithdraw'];
        const dict_free = { 'free': { }};
        const dict_total = { 'total': { }};
        const dict_used = { 'used': { }};
        for (let i = 0; i < balance.length; i++) {
            const ativo = balance[i]['asset'];
            const free = parseFloat (balance[i]['free']);
            const locked = parseFloat (balance[i]['locked']);
            const total = free + locked;
            exp_free.push ([ativo, free]);
            dict_free[ativo] = free;
            dict_total[ativo] = total;
            dict_used[ativo] = locked;
            exp_total.push ([ativo, total]);
            exp_used.push ([ativo, locked]);
            const pre_balance = {};
            pre_balance['asset'] = ativo;
            pre_balance['free'] = free.toString ();
            pre_balance['locked'] = locked.toString ();
            exp_balances.push (pre_balance);
            const pre_data_dict = {};
            pre_data_dict['free'] = free;
            pre_data_dict['total'] = free;
            pre_data_dict['used'] = locked;
            data[ativo] = pre_data_dict;
        }
        const info = {
            'accountType': 'SPOT',
            'balances': exp_balances,
            'permissions': pre_permitidos,
            'buyerCommission': buyerCommission,
            'canDeposit': canDeposit === 1 ? true : false,
            'canTrade': canTrade === 1 ? true : false,
            'canWithdraw': canWithdraw === 1 ? true : false,
            'makerCommission': makerCommission,
            'sellerCommission': sellerCommission,
            'takerCommission': takerCommission,
            'updateTime': timestamp,
        };
        data['free'] = dict_free;
        data['info'] = info;
        data['total'] = dict_total;
        data['used'] = dict_used;
        return data;
    }

    async fetchBidsAsks (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        const query = this.omit (params, 'type');
        const method = 'publicGetTickerBookTicker';
        const response = await this[method] (query);
        return this.parseTickers (response, symbols);
    }

    parseTicker (ticker, market = undefined) {
        //
        //     {
        //         symbol: 'ETHBTC',
        //         priceChange: '0.00068700',
        //         priceChangePercent: '2.075',
        //         weightedAvgPrice: '0.03342681',
        //         prevClosePrice: '0.03310300',
        //         lastPrice: '0.03378900',
        //         lastQty: '0.07700000',
        //         bidPrice: '0.03378900',
        //         bidQty: '7.16800000',
        //         askPrice: '0.03379000',
        //         askQty: '24.00000000',
        //         openPrice: '0.03310200',
        //         highPrice: '0.03388900',
        //         lowPrice: '0.03306900',
        //         volume: '205478.41000000',
        //         quoteVolume: '6868.48826294',
        //         openTime: 1601469986932,
        //         closeTime: 1601556386932,
        //         firstId: 196098772,
        //         lastId: 196186315,
        //         count: 87544
        //     }
        //
        const timestamp = this.safeInteger (ticker, 'closeTime');
        const marketId = this.safeString (ticker, 'symbol');
        const symbol = this.safeSymbol (marketId, market);
        const last = this.safeFloat (ticker, 'lastPrice');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeFloat (ticker, 'highPrice'),
            'low': this.safeFloat (ticker, 'lowPrice'),
            'bid': this.safeFloat (ticker, 'bidPrice'),
            'bidVolume': this.safeFloat (ticker, 'bidQty'),
            'ask': this.safeFloat (ticker, 'askPrice'),
            'askVolume': this.safeFloat (ticker, 'askQty'),
            'vwap': this.safeFloat (ticker, 'weightedAvgPrice'),
            'open': this.safeFloat (ticker, 'openPrice'),
            'close': last,
            'last': last,
            'previousClose': this.safeFloat (ticker, 'prevClosePrice'), // previous day close
            'change': this.safeFloat (ticker, 'priceChange'),
            'percentage': this.safeFloat (ticker, 'priceChangePercent'),
            'average': undefined,
            'baseVolume': this.safeFloat (ticker, 'volume'),
            'quoteVolume': this.safeFloat (ticker, 'quoteVolume'),
            'info': ticker,
        };
    }

    async fetchTicker (symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        const method = 'publicGetTicker24hr';
        const response = await this[method] (this.extend (request, params));
        if (Array.isArray (response)) {
            const firstTicker = this.safeValue (response, 0, {});
            return this.parseTicker (firstTicker, market);
        }
        return this.parseTicker (response, market);
    }

    parseTickers (rawTickers, symbols = undefined) {
        const tickers = [];
        for (let i = 0; i < rawTickers.length; i++) {
            tickers.push (this.parseTicker (rawTickers[i]));
        }
        return this.filterByArray (tickers, 'symbol', symbols);
    }

    async fetchTickers (symbols = undefined, params = {}) {
        await this.loadMarkets ();
        const query = this.omit (params, 'type');
        const defaultMethod = 'publicGetTicker24hr';
        const method = this.safeString (this.options, 'fetchTickersMethod', defaultMethod);
        const response = await this[method] (query);
        return this.parseTickers (response, symbols);
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     [
        //         1591478520000,
        //         "0.02501300",
        //         "0.02501800",
        //         "0.02500000",
        //         "0.02500000",
        //         "22.19000000",
        //         1591478579999,
        //         "0.55490906",
        //         40,
        //         "10.92900000",
        //         "0.27336462",
        //         "0"
        //     ]
        //
        return [
            this.safeInteger (ohlcv, 0),
            this.safeFloat (ohlcv, 1),
            this.safeFloat (ohlcv, 2),
            this.safeFloat (ohlcv, 3),
            this.safeFloat (ohlcv, 4),
            this.safeFloat (ohlcv, 5),
        ];
    }

    async fetchOHLCV (symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': market['id'],
            'interval': this.timeframes[timeframe],
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default == max == 500
        }
        const method = 'publicGetKlines';
        const response = await this[method] (this.extend (request, params));
        //
        //     [
        //         [1591478520000,"0.02501300","0.02501800","0.02500000","0.02500000","22.19000000",1591478579999,"0.55490906",40,"10.92900000","0.27336462","0"],
        //         [1591478580000,"0.02499600","0.02500900","0.02499400","0.02500300","21.34700000",1591478639999,"0.53370468",24,"7.53800000","0.18850725","0"],
        //         [1591478640000,"0.02500800","0.02501100","0.02500300","0.02500800","154.14200000",1591478699999,"3.85405839",97,"5.32300000","0.13312641","0"],
        //     ]
        //
        return this.parseOHLCVs (response, market, timeframe, since, limit);
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOpenOrders requires a symbol argument');
        }
        if (since === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOpenOrders requires a since argument');
        }
        if (limit === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOpenOrders requires a limit argument');
        }
        const orders = await this.fetchOrders (symbol, since, limit, params);
        return this.filterBy (orders, 'status', 'open');
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        const method = 'apiGetV3Trades';
        await this.loadMarkets ();
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this[method] (this.extend (request, params));
        const result = [];
        for (let i = 0; i < response.length; i++) {
            result.push (this.convertTrade (symbol, response[i]));
        }
        return result;
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired ('fetchOrders requires a symbol argument');
        }
        const method = 'signedGetOrdersTrades';
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        let response = await this[method] (this.extend (request, params));
        response = response['data']['list'];
        return this.parseTrades (response, market, since, limit);
    }

    parseL2 (entry) {
        const timestamp = this.safeTimestamp (entry, 'T');
        const datetime = this.iso8601 (timestamp);
        return {
            'tradeId': this.safeInteger (entry, 'a'),
            'price': this.safeFloat (entry, 'p'),
            'quantity': this.safeFloat (entry, 'q'),
            'firstTradeId': this.safeInteger (entry, 'f'),
            'lastTradeId': this.safeInteger (entry, 'l'),
            'timestamp': timestamp,
            'datetime': datetime,
            'maker': this.safeValue (entry, 'm'),
            'bestPriceMatch': this.safeValue (entry, 'M'),
        };
    }

    async fetchAggTrades (symbol, limit = undefined, params = {}) {
        const method = 'apiGetV3AggTrades';
        await this.loadMarkets ();
        const request = {
            'symbol': this.markets[symbol]['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this[method] (this.extend (request, params));
        const result = [];
        for (let i = 0; i < response.length; i++) {
            result.push (this.parseL2 (response[i]));
        }
        return result;
    }
};

