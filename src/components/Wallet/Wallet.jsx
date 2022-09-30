import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col, Table, Image } from "react-bootstrap";
import "./Wallet.css";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { fetchAllTransactionStart } from "../../store/actions/TransactionAction";
import ConnectStripeModal from "../helper/ConnectStripeModal";
import WithdrawModal from "../helper/WithdrawModal";
import WalletRechargeModal from "../helper/WalletRechargeModal";
import NoDataFound from "../NoDataFound/NoDataFound";
import WalletLoader from "../Loader/WalletLoader";
import { withNamespaces } from "react-i18next";

const Wallet = (props) => {
	const { t } = props;
	useEffect(() => {
		props.dispatch(fetchWalletDetailsStart());
		props.dispatch(fetchAllTransactionStart());
	}, []);

	const [stripeConnectModal, setStripeConnectModal] = useState(false);
	const [withdrawModal, setWithdrawModal] = useState(false);
	const [rechargeModal, setRechargeModal] = useState(false);

	const closeRechargeModal = () => {
		setRechargeModal(false);
	};

	const closeWithdrawModal = () => {
		setTimeout(() => {
			setWithdrawModal(false);
		},300)
	};

	const closeStripeConnectModal = () => {
		setStripeConnectModal(false);
	};

	return (
		<>
			<div className="wallet-sec">
				{props.wallet.loading ? (
					<WalletLoader></WalletLoader>
				) : (
					<Container>
						<Row>
							<Col sm={12} md={12}>
								<div className="wallet-header-sec">
									<Row>
										<Col sm={12} md={12} xl={2}>
											<div className="wallet-header-card">
												<h5>{t("current_balance")}</h5>
												<div className="wallet-header-details">
													<Image
														src={
															window.location.origin +
															"/assets/images/icons/wallet-dollar.svg"
														}
														className="credit-img"
													/>
													<h3>
														{props.wallet.data.user_wallet.remaining_formatted}
														{/* <span className="amount-decimal">.76500293</span>
														<span className="amount-abb">BTC</span> */}
													</h3>
												</div>
											</div>
										</Col>
										<Col sm={12} md={12} xl={5}>
											<div className="edit-save">
												<Button
													className="send-btn-white"
													onClick={() => setRechargeModal(true)}
												>
												{t("wallet_recharge")}
												</Button>
											</div>
										</Col>
										<Col sm={12} md={12} xl={5}>
											{props.wallet.data.user.stripe_acc_id || props.wallet.data.user_billing_account_count > 0 ?
												<div className="edit-save">
													<Button
														className="send-btn-white"
														onClick={() => setWithdrawModal(true)}
													>
														{t("withDraw")}
													</Button>
												</div>
												:
												<div className="edit-save">
													<Button
														className="send-btn-white"
														onClick={() => setStripeConnectModal(true)}
													>
													{t("withDraw")}
													</Button>
												</div>
											}
										</Col>
									</Row>
								</div>
							</Col>
						</Row>
					</Container>
				)}
			</div>
			<div className="trans-table-sec">
				<Container>
					<Row>
						<Col sm={12} md={12}>
							<h4>{t("transactions")}</h4>
							<div className="trans-table">
								<Table borderedless responsive>
									<tbody>
										{props.transaction.loading ? (                           
											t("loading")
										) : props.transaction.data.history.length > 0 ? (
											props.transaction.data.history.map((data) => (
												<tr>
													<td>{data.status_formatted}</td>
													<td className="amount">
														{data.paid_amount_formatted}{" "}
														{/* <span className="amout-abb">STRAT</span> */}
													</td>
													<td className="amount">
														{t("service_fee")} :{" "}{data.admin_amount_formatted}{" "}
														{/* <span className="amout-abb">STRAT</span> */}
													</td>
													<td className="amount">
														<span className="text-capitalize">
															{data.payment_type}{" "}
														</span>
														{/* <span className="amout-abb text-muted">TYPE</span> */}
													</td>
													<td>
													{(data.usage_type == 'tip' ? (data.payment_type != 'credit' ? "to: " : "from: ")  : "from: ")}
														{data.received_from_username
															? data.received_from_username
															: "-"}
													</td>
													<td>
														{t("message")} :{" "}
														{(data.usage_type != 'tip') ? (data.message ? data.message : data.user_tip.message) : (data.user_tip ? data.user_tip.message : data.message)}
													</td>
													<td>{data.payment_id}</td>
													{/* <td>
															<Badge className="unconfirmed-badge">
																unconfirmed
															</Badge>
															<span>now</span>
														</td> */}
												</tr>
											))
										) : (
											<NoDataFound></NoDataFound>
										)}
									</tbody>
								</Table>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<ConnectStripeModal
				stripeConnectModal={stripeConnectModal}
				closeStripeConnectModal={closeStripeConnectModal}
			/>
			<WalletRechargeModal
				rechargeModal={rechargeModal}
				closeRechargeModal={closeRechargeModal}
				payments={props.wallet}
			/>
			<WithdrawModal
				withdrawModal={withdrawModal}
				closeWithdrawModal={closeWithdrawModal}
				payments={props.wallet}
			/>
		</>
	);
};

const mapStateToPros = (state) => ({
	wallet: state.wallet.walletData,
	transaction: state.transaction.allTransaction,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(withNamespaces()(Wallet));
